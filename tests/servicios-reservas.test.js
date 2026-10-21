const { before, after, test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const temp = fs.mkdtempSync(path.join(os.tmpdir(), "agenda-clara-tests-"));
process.env.DB_PATH = path.join(temp, "agenda.db");
const app = require("../server/app");
const db = require("../server/database/connection");
let server;
let baseUrl;
let clienteId;
let servicioId;
let reservaId;

before(async () => {
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => { server.once("listening", resolve); server.once("error", reject); });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
  if (server?.listening) await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  db.close();
  fs.rmSync(temp, { recursive: true, force: true });
});
async function request(url, options = {}) {
  const response = await fetch(`${baseUrl}${url}`, { ...options, headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...(options.headers || {}) } });
  const raw = await response.text();
  return { status: response.status, body: raw ? JSON.parse(raw) : null };
}
const json = (method, body) => ({ method, body: JSON.stringify(body) });

test("V1 Agenda Clara: servicios y reservas", async (t) => {
  await t.test("registra un cliente de prueba", async () => {
    const r = await request("/api/clientes", json("POST", { nombre: "Cliente Agenda", documento: "AGENDA-001", correo: "agenda@example.com" }));
    assert.equal(r.status, 201); clienteId = r.body.id;
  });
  await t.test("registra servicio con precio y duración", async () => {
    const r = await request("/api/servicios", json("POST", { nombre: "Consulta inicial", descripcion: "Primera consulta", precio: 65.5, duracion_minutos: 45 }));
    assert.equal(r.status, 201); assert.equal(r.body.precio, 65.5); assert.equal(r.body.duracion_minutos, 45); servicioId = r.body.id;
  });
  await t.test("consulta catálogo de servicios", async () => {
    const r = await request("/api/servicios?q=Consulta"); assert.equal(r.status, 200); assert.ok(r.body.some(s => s.id === servicioId));
  });
  await t.test("valida precio y duración del servicio", async () => {
    const r = await request("/api/servicios", json("POST", { nombre: "Servicio inválido", precio: -5, duracion_minutos: 0 })); assert.equal(r.status, 400);
  });
  await t.test("registra una reserva con cliente, servicio, fecha y hora", async () => {
    const r = await request("/api/reservas", json("POST", { cliente_id: clienteId, servicio_id: servicioId, fecha_hora: "2027-03-15T10:30", observaciones: "Primera visita" }));
    assert.equal(r.status, 201); assert.equal(r.body.cliente_id, clienteId); assert.equal(r.body.servicio_id, servicioId); assert.equal(r.body.estado, "RESERVADA"); assert.ok(r.body.codigo.startsWith("RES-")); reservaId = r.body.id;
  });
  await t.test("consulta reservas y datos relacionados", async () => {
    const r = await request("/api/reservas?q=Cliente Agenda"); assert.equal(r.status, 200); assert.ok(r.body.some(x => x.id === reservaId)); assert.equal(r.body.find(x => x.id === reservaId).servicio_nombre, "Consulta inicial");
  });
  await t.test("rechaza una reserva con fecha inválida", async () => {
    const r = await request("/api/reservas", json("POST", { cliente_id: clienteId, servicio_id: servicioId, fecha_hora: "2027-99-40T27:70" })); assert.equal(r.status, 400);
  });
  await t.test("rechaza una reserva con cliente inexistente", async () => {
    const r = await request("/api/reservas", json("POST", { cliente_id: 999999, servicio_id: servicioId, fecha_hora: "2027-03-15T10:30" })); assert.equal(r.status, 400);
  });
  await t.test("cancela una reserva", async () => {
    const r = await request(`/api/reservas/${reservaId}/cancelar`, { method: "PATCH" }); assert.equal(r.status, 200); assert.equal(r.body.estado, "CANCELADA");
  });
  await t.test("evita cancelar dos veces la misma reserva", async () => {
    const r = await request(`/api/reservas/${reservaId}/cancelar`, { method: "PATCH" }); assert.equal(r.status, 409);
  });
});
