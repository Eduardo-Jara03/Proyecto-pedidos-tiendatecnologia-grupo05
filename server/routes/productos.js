const express = require("express");
const db = require("../database/connection");

const router = express.Router();

router.get("/", (req, res) => {
    const q = String(req.query.q || "").trim();
    const incluirInactivos = req.query.todos === "true";

    let sql = `
        SELECT id, codigo, nombre, precio, activo, creado_en
        FROM productos
        WHERE 1 = 1
    `;

    const parametros = [];

    if (!incluirInactivos) {
        sql += " AND activo = 1";
    }

    if (q) {
        sql += " AND (codigo LIKE ? OR nombre LIKE ?)";
        parametros.push(`%${q}%`, `%${q}%`);
    }

    sql += " ORDER BY id DESC";

    res.json(db.prepare(sql).all(...parametros));
});

router.get("/:id", (req, res) => {
    const producto = db.prepare(`
        SELECT id, codigo, nombre, precio, activo, creado_en
        FROM productos
        WHERE id = ?
    `).get(Number(req.params.id));

    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
});

router.post("/", (req, res) => {
    const codigo = String(req.body.codigo || "").trim();
    const nombre = String(req.body.nombre || "").trim();
    const precio = Number(req.body.precio);

    if (!codigo || !nombre || req.body.precio === undefined ||
        req.body.precio === null || req.body.precio === "") {
        return res.status(400).json({
            error: "Código, nombre y precio son obligatorios"
        });
    }

    if (!Number.isFinite(precio) || precio <= 0) {
        return res.status(400).json({ error: "El precio debe ser mayor que cero" });
    }

    try {
        const resultado = db.prepare(`
            INSERT INTO productos (codigo, nombre, precio)
            VALUES (?, ?, ?)
        `).run(codigo, nombre, precio);

        res.status(201).json(
            db.prepare(`
                SELECT id, codigo, nombre, precio, activo, creado_en
                FROM productos WHERE id = ?
            `).get(resultado.lastInsertRowid)
        );
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                error: "Ya existe un producto con ese código"
            });
        }
        console.error(error);
        res.status(500).json({ error: "No se pudo registrar el producto" });
    }
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const codigo = String(req.body.codigo || "").trim();
    const nombre = String(req.body.nombre || "").trim();
    const precio = Number(req.body.precio);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: "Identificador inválido" });
    }

    if (!codigo || !nombre || req.body.precio === undefined ||
        req.body.precio === null || req.body.precio === "") {
        return res.status(400).json({
            error: "Código, nombre y precio son obligatorios"
        });
    }

    if (!Number.isFinite(precio) || precio <= 0) {
        return res.status(400).json({ error: "El precio debe ser mayor que cero" });
    }

    try {
        const resultado = db.prepare(`
            UPDATE productos
            SET codigo = ?, nombre = ?, precio = ?
            WHERE id = ? AND activo = 1
        `).run(codigo, nombre, precio, id);

        if (!resultado.changes) {
            return res.status(404).json({ error: "Producto activo no encontrado" });
        }

        res.json(
            db.prepare(`
                SELECT id, codigo, nombre, precio, activo, creado_en
                FROM productos WHERE id = ?
            `).get(id)
        );
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                error: "Ya existe un producto con ese código"
            });
        }
        console.error(error);
        res.status(500).json({ error: "No se pudo actualizar el producto" });
    }
});

router.delete("/:id", (req, res) => {
    const resultado = db.prepare(`
        UPDATE productos SET activo = 0
        WHERE id = ? AND activo = 1
    `).run(Number(req.params.id));

    if (!resultado.changes) {
        return res.status(404).json({ error: "Producto activo no encontrado" });
    }

    res.status(204).end();
});

module.exports = router;
