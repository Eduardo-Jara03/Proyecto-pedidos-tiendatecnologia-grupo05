const express = require("express");
const db = require("../database/connection");

const router = express.Router();
const seleccionarServicio = `SELECT id, nombre, descripcion, precio, duracion_minutos, activo, creado_en, actualizado_en FROM servicios`;

router.get("/", (req, res) => {
    const q = String(req.query.q || "").trim();
    const servicios = q
        ? db.prepare(`${seleccionarServicio} WHERE nombre LIKE ? OR descripcion LIKE ? ORDER BY id DESC`).all(`%${q}%`, `%${q}%`)
        : db.prepare(`${seleccionarServicio} ORDER BY id DESC`).all();
    res.json(servicios);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: "Identificador inválido" });
    const servicio = db.prepare(`${seleccionarServicio} WHERE id = ?`).get(id);
    if (!servicio) return res.status(404).json({ error: "Servicio no encontrado" });
    res.json(servicio);
});

router.post("/", (req, res) => {
    const nombre = String(req.body.nombre || "").trim();
    const descripcion = String(req.body.descripcion || "").trim();
    const precio = Number(req.body.precio);
    const duracion = Number(req.body.duracion_minutos);
    if (!nombre || !Number.isFinite(precio) || precio < 0 || !Number.isInteger(duracion) || duracion <= 0) {
        return res.status(400).json({ error: "Nombre, precio no negativo y duración positiva en minutos son obligatorios" });
    }
    try {
        const result = db.prepare("INSERT INTO servicios (nombre, descripcion, precio, duracion_minutos) VALUES (?, ?, ?, ?)").run(nombre, descripcion, precio, duracion);
        res.status(201).json(db.prepare(`${seleccionarServicio} WHERE id = ?`).get(result.lastInsertRowid));
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") return res.status(409).json({ error: "Ya existe un servicio con ese nombre" });
        console.error(error);
        res.status(500).json({ error: "No se pudo registrar el servicio" });
    }
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const nombre = String(req.body.nombre || "").trim();
    const descripcion = String(req.body.descripcion || "").trim();
    const precio = Number(req.body.precio);
    const duracion = Number(req.body.duracion_minutos);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: "Identificador inválido" });
    if (!nombre || !Number.isFinite(precio) || precio < 0 || !Number.isInteger(duracion) || duracion <= 0) {
        return res.status(400).json({ error: "Nombre, precio no negativo y duración positiva en minutos son obligatorios" });
    }
    try {
        const result = db.prepare("UPDATE servicios SET nombre = ?, descripcion = ?, precio = ?, duracion_minutos = ?, actualizado_en = CURRENT_TIMESTAMP WHERE id = ?").run(nombre, descripcion, precio, duracion, id);
        if (!result.changes) return res.status(404).json({ error: "Servicio no encontrado" });
        res.json(db.prepare(`${seleccionarServicio} WHERE id = ?`).get(id));
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") return res.status(409).json({ error: "Ya existe un servicio con ese nombre" });
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar el servicio" });
    }
});

router.patch("/:id/estado", (req, res) => {
    const id = Number(req.params.id);
    const activo = req.body.activo;
    if (!Number.isInteger(id) || id <= 0 || ![true, false, 0, 1].includes(activo)) return res.status(400).json({ error: "Identificador o estado inválido" });
    const result = db.prepare("UPDATE servicios SET activo = ?, actualizado_en = CURRENT_TIMESTAMP WHERE id = ?").run(Number(Boolean(activo)), id);
    if (!result.changes) return res.status(404).json({ error: "Servicio no encontrado" });
    res.json(db.prepare(`${seleccionarServicio} WHERE id = ?`).get(id));
});

module.exports = router;
