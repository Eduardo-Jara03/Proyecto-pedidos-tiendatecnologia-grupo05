const express = require("express");
const db = require("../database/connection");
const router = express.Router();

const consultaBase = `
    SELECT r.id, r.codigo, r.cliente_id, c.nombre AS cliente_nombre,
           r.servicio_id, s.nombre AS servicio_nombre, s.precio AS precio_servicio,
           s.duracion_minutos, r.fecha_hora, r.estado, r.observaciones,
           r.creado_en, r.actualizado_en
    FROM reservas r
    JOIN clientes c ON c.id = r.cliente_id
    JOIN servicios s ON s.id = r.servicio_id
`;

function fechaValida(valor) {
    if (typeof valor !== "string" || !/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.test(valor)) return false;
    const [, anio, mes, dia, hora, minuto] = valor.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
    const y = Number(anio), m = Number(mes), d = Number(dia), h = Number(hora), min = Number(minuto);
    const diasMes = new Date(Date.UTC(y, m, 0)).getUTCDate();
    return m >= 1 && m <= 12 && d >= 1 && d <= diasMes && h >= 0 && h <= 23 && min >= 0 && min <= 59;
}

router.get("/", (req, res) => {
    const q = String(req.query.q || "").trim();
    const estado = String(req.query.estado || "").trim().toUpperCase();
    let sql = consultaBase;
    const filtros = [];
    const params = [];
    if (q) {
        filtros.push("(r.codigo LIKE ? OR c.nombre LIKE ? OR s.nombre LIKE ?)");
        params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }
    if (estado) {
        if (!["RESERVADA", "CANCELADA"].includes(estado)) return res.status(400).json({ error: "Estado de reserva inválido" });
        filtros.push("r.estado = ?");
        params.push(estado);
    }
    if (filtros.length) sql += ` WHERE ${filtros.join(" AND ")}`;
    sql += " ORDER BY r.fecha_hora DESC, r.id DESC";
    res.json(db.prepare(sql).all(...params));
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: "Identificador inválido" });
    const reserva = db.prepare(`${consultaBase} WHERE r.id = ?`).get(id);
    if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json(reserva);
});

router.post("/", (req, res) => {
    const clienteId = Number(req.body.cliente_id);
    const servicioId = Number(req.body.servicio_id);
    const fechaHora = String(req.body.fecha_hora || "").trim();
    const observaciones = String(req.body.observaciones || "").trim();
    if (!Number.isInteger(clienteId) || clienteId <= 0 || !Number.isInteger(servicioId) || servicioId <= 0 || !fechaValida(fechaHora)) {
        return res.status(400).json({ error: "Selecciona un cliente, un servicio y una fecha/hora válida (YYYY-MM-DDTHH:mm)" });
    }
    const cliente = db.prepare("SELECT id FROM clientes WHERE id = ?").get(clienteId);
    if (!cliente) return res.status(400).json({ error: "El cliente seleccionado no existe" });
    const servicio = db.prepare("SELECT id, activo FROM servicios WHERE id = ?").get(servicioId);
    if (!servicio || !servicio.activo) return res.status(400).json({ error: "El servicio seleccionado no existe o está inactivo" });
    const codigo = `RES-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    try {
        const result = db.prepare("INSERT INTO reservas (codigo, cliente_id, servicio_id, fecha_hora, observaciones) VALUES (?, ?, ?, ?, ?)").run(codigo, clienteId, servicioId, fechaHora, observaciones);
        res.status(201).json(db.prepare(`${consultaBase} WHERE r.id = ?`).get(result.lastInsertRowid));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo registrar la reserva" });
    }
});

router.patch("/:id/cancelar", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: "Identificador inválido" });
    const reserva = db.prepare("SELECT id, estado FROM reservas WHERE id = ?").get(id);
    if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });
    if (reserva.estado === "CANCELADA") return res.status(409).json({ error: "La reserva ya está cancelada" });
    db.prepare("UPDATE reservas SET estado = 'CANCELADA', actualizado_en = CURRENT_TIMESTAMP WHERE id = ?").run(id);
    res.json(db.prepare(`${consultaBase} WHERE r.id = ?`).get(id));
});

module.exports = router;
