const express = require("express");
const db = require("../database/connection");

const router = express.Router();

router.get("/", (req, res) => {
    const q = String(req.query.q || "").trim();

    const clientes = q
        ? db.prepare(`
            SELECT id, nombre, documento, correo, creado_en
            FROM clientes
            WHERE nombre LIKE ? OR documento LIKE ? OR correo LIKE ?
            ORDER BY id DESC
        `).all(`%${q}%`, `%${q}%`, `%${q}%`)
        : db.prepare(`
            SELECT id, nombre, documento, correo, creado_en
            FROM clientes
            ORDER BY id DESC
        `).all();

    res.json(clientes);
});

router.get("/:id", (req, res) => {
    const cliente = db.prepare(
        "SELECT id, nombre, documento, correo, creado_en FROM clientes WHERE id = ?"
    ).get(Number(req.params.id));

    if (!cliente) {
        return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(cliente);
});

router.post("/", (req, res) => {
    const nombre = String(req.body.nombre || "").trim();
    const documento = String(req.body.documento || "").trim();
    const correo = String(req.body.correo || "").trim();

    if (!nombre || !documento || !correo) {
        return res.status(400).json({
            error: "Nombre, documento y correo son obligatorios"
        });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        return res.status(400).json({ error: "El correo no tiene un formato válido" });
    }

    try {
        const resultado = db.prepare(`
            INSERT INTO clientes (nombre, documento, correo)
            VALUES (?, ?, ?)
        `).run(nombre, documento, correo);

        const cliente = db.prepare(
            "SELECT id, nombre, documento, correo, creado_en FROM clientes WHERE id = ?"
        ).get(resultado.lastInsertRowid);

        res.status(201).json(cliente);
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                error: "Ya existe un cliente con ese documento"
            });
        }
        console.error(error);
        res.status(500).json({ error: "No se pudo registrar el cliente" });
    }
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const nombre = String(req.body.nombre || "").trim();
    const documento = String(req.body.documento || "").trim();
    const correo = String(req.body.correo || "").trim();

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: "Identificador inválido" });
    }

    if (!nombre || !documento || !correo) {
        return res.status(400).json({
            error: "Nombre, documento y correo son obligatorios"
        });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        return res.status(400).json({ error: "El correo no tiene un formato válido" });
    }

    try {
        const resultado = db.prepare(`
            UPDATE clientes
            SET nombre = ?, documento = ?, correo = ?
            WHERE id = ?
        `).run(nombre, documento, correo, id);

        if (!resultado.changes) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        res.json(
            db.prepare(
                "SELECT id, nombre, documento, correo, creado_en FROM clientes WHERE id = ?"
            ).get(id)
        );
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                error: "Ya existe un cliente con ese documento"
            });
        }
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar el cliente" });
    }
});

router.delete("/:id", (req, res) => {
    try {
        const resultado = db.prepare(
            "DELETE FROM clientes WHERE id = ?"
        ).run(Number(req.params.id));

        if (!resultado.changes) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        res.status(204).end();
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_FOREIGNKEY") {
            return res.status(409).json({
                error: "No se puede eliminar el cliente porque tiene reservas asociadas"
            });
        }
        console.error(error);
        res.status(500).json({ error: "No se pudo eliminar el cliente" });
    }
});

module.exports = router;
