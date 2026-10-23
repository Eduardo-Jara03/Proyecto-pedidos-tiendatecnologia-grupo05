const { before, after, test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "agenda-clara-clientes-"));
process.env.DB_PATH = path.join(temporaryDirectory, "tests.db");
const app = require("../server/app");
const db = require("../server/database/connection");
let server;
let baseUrl;
let clienteId;

before(async () => {
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => { server.once("listening", resolve); server.once("error", reject); });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
  if (server?.listening) await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  db.close();
  fs.rmSync(temporaryDirectory, { recursive: true, force: true });
});
async function request(url, options = {}) {
  const response = await fetch(`${baseUrl}${url}`, { ...options, headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...(options.headers || {}) } });
  const raw = await response.text();
  return { status: response.status, body: raw ? JSON.parse(raw) : null };
}
const json = (method, body) => ({ method, body: JSON.stringify(body) });

test("V1 Agenda Clara: API y gestión de clientes", async (t) => {
  await t.test("informa que API y SQLite están operativas", async () => {
    const r = await request("/api/health"); assert.equal(r.status, 200); assert.equal(r.body.estado, "correcto"); assert.equal(r.body.baseDatos, "conectada");
  });
  await t.test("registra un cliente válido", async () => {
    const r = await request("/api/clientes", json("POST", { nombre: "Cliente Agenda", documento: "AGENDA-CLIENTE-001", correo: "cliente@example.com" }));
    assert.equal(r.status, 201); assert.equal(r.body.nombre, "Cliente Agenda"); clienteId = r.body.id;
  });
  await t.test("consulta y busca clientes", async () => {
    const one = await request(`/api/clientes/${clienteId}`); assert.equal(one.status, 200); assert.equal(one.body.documento, "AGENDA-CLIENTE-001");
    const list = await request("/api/clientes?q=AGENDA-CLIENTE-001"); assert.equal(list.status, 200); assert.ok(list.body.some(c => c.id === clienteId));
  });
  await t.test("rechaza datos incompletos y correo inválido", async () => {
    const missing = await request("/api/clientes", json("POST", { nombre: "Sin datos" })); assert.equal(missing.status, 400);
    const email = await request("/api/clientes", json("POST", { nombre: "Prueba", documento: "AGENDA-CLIENTE-002", correo: "no-es-correo" })); assert.equal(email.status, 400);
  });
  await t.test("rechaza documento duplicado", async () => {
    const r = await request("/api/clientes", json("POST", { nombre: "Duplicado", documento: "AGENDA-CLIENTE-001", correo: "duplicado@example.com" })); assert.equal(r.status, 409);
  });
  await t.test("actualiza la información del cliente", async () => {
    const r = await request(`/api/clientes/${clienteId}`, json("PUT", { nombre: "Cliente Actualizado", documento: "AGENDA-CLIENTE-001", correo: "actualizado@example.com" }));
    assert.equal(r.status, 200); assert.equal(r.body.nombre, "Cliente Actualizado");
  });
  await t.test("responde 404 para cliente inexistente", async () => {
    const r = await request("/api/clientes/999999"); assert.equal(r.status, 404);
  });
  await t.test("no expone los módulos anteriores de tienda", async () => {
    const productos = await request("/api/productos"); const pedidos = await request("/api/pedidos");
    assert.equal(productos.status, 404); assert.equal(pedidos.status, 404);
  });
});
