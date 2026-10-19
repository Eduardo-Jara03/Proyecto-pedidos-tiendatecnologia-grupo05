const express = require("express");
const db = require("../database/connection");

const router = express.Router();

function obtenerId(valor) {
    const id = Number(valor);
    return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function obtenerPedido(id) {
    const pedido = db.prepare(`
        SELECT p.id, p.codigo, p.cliente_id, c.nombre AS cliente,
               p.estado, p.total, p.creado_en, p.actualizado_en
        FROM pedidos p
        JOIN clientes c ON c.id = p.cliente_id
        WHERE p.id = ?
    `).get(id);

    if (!pedido) return null;

    pedido.detalles = db.prepare(`
        SELECT d.id, d.producto_id, pr.codigo AS codigo_producto,
               pr.nombre AS producto, d.cantidad,
               d.precio_unitario, d.subtotal
        FROM detalle_pedido d
        JOIN productos pr ON pr.id = d.producto_id
        WHERE d.pedido_id = ?
        ORDER BY d.id
    `).all(id);

    return pedido;
}

router.get("/", (req, res) => {
    const q = String(req.query.q || "").trim();

    const pedidos = q
        ? db.prepare(`
            SELECT DISTINCT p.id, p.codigo, p.cliente_id,
                   c.nombre AS cliente, p.estado, p.total,
                   p.creado_en, p.actualizado_en,
                   (SELECT pr2.nombre FROM detalle_pedido d2
                    JOIN productos pr2 ON pr2.id = d2.producto_id
                    WHERE d2.pedido_id = p.id ORDER BY d2.id LIMIT 1) AS producto,
                   (SELECT SUM(d2.cantidad) FROM detalle_pedido d2
                    WHERE d2.pedido_id = p.id) AS cantidad,
                   (SELECT d2.precio_unitario FROM detalle_pedido d2
                    WHERE d2.pedido_id = p.id ORDER BY d2.id LIMIT 1) AS precio
            FROM pedidos p
            JOIN clientes c ON c.id = p.cliente_id
            LEFT JOIN detalle_pedido d ON d.pedido_id = p.id
            LEFT JOIN productos pr ON pr.id = d.producto_id
            WHERE p.codigo LIKE ?
               OR c.nombre LIKE ?
               OR pr.nombre LIKE ?
               OR pr.codigo LIKE ?
            ORDER BY p.id DESC
        `).all(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`)
        : db.prepare(`
            SELECT p.id, p.codigo, p.cliente_id,
                   c.nombre AS cliente, p.estado, p.total,
                   p.creado_en, p.actualizado_en,
                   (SELECT pr2.nombre FROM detalle_pedido d2
                    JOIN productos pr2 ON pr2.id = d2.producto_id
                    WHERE d2.pedido_id = p.id ORDER BY d2.id LIMIT 1) AS producto,
                   (SELECT SUM(d2.cantidad) FROM detalle_pedido d2
                    WHERE d2.pedido_id = p.id) AS cantidad,
                   (SELECT d2.precio_unitario FROM detalle_pedido d2
                    WHERE d2.pedido_id = p.id ORDER BY d2.id LIMIT 1) AS precio
            FROM pedidos p
            JOIN clientes c ON c.id = p.cliente_id
            ORDER BY p.id DESC
        `).all();

    res.json(pedidos);
});

router.get("/:id", (req, res) => {
    const id = obtenerId(req.params.id);

    if (!id) {
        return res.status(400).json({ error: "Identificador inválido" });
    }

    const pedido = obtenerPedido(id);

    if (!pedido) {
        return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json(pedido);
});

router.post("/", (req, res) => {
    const cuerpo = req.body && typeof req.body === "object" ? req.body : {};
    const clienteId = obtenerId(cuerpo.cliente_id);
    const detalles = cuerpo.detalles;

    if (!clienteId || !Array.isArray(detalles) || detalles.length === 0) {
        return res.status(400).json({
            error: "Se requiere un cliente válido y al menos un detalle"
        });
    }

    const lineas = [];
    const cantidadesPorProducto = new Map();

    for (const detalle of detalles) {
        const productoId = obtenerId(detalle?.producto_id);
        const cantidad = detalle?.cantidad;

        if (!productoId || !Number.isSafeInteger(cantidad) || cantidad <= 0) {
            return res.status(400).json({
                error: "Cada detalle requiere un producto válido y una cantidad entera positiva"
            });
        }

        cantidadesPorProducto.set(
            productoId,
            (cantidadesPorProducto.get(productoId) || 0) + cantidad
        );
    }

    for (const [productoId, cantidad] of cantidadesPorProducto) {
        const producto = db.prepare(`
            SELECT id, codigo, nombre, precio
            FROM productos
            WHERE id = ? AND activo = 1
        `).get(productoId);

        if (!producto) {
            return res.status(400).json({
                error: `El producto ${productoId} no existe o está inactivo`
            });
        }

        lineas.push({ producto, cantidad });
    }

    const cliente = db.prepare(
        "SELECT id FROM clientes WHERE id = ?"
    ).get(clienteId);

    if (!cliente) {
        return res.status(400).json({ error: "El cliente no existe" });
    }

    const total = Math.round(lineas.reduce(
        (suma, linea) => suma + linea.producto.precio * linea.cantidad,
        0
    ) * 100) / 100;

    const crearPedido = db.transaction(() => {
        const codigo = `PED-${Date.now()}-${require("node:crypto").randomBytes(4).toString("hex")}`;

        const resultado = db.prepare(`
            INSERT INTO pedidos (codigo, cliente_id, total)
            VALUES (?, ?, ?)
        `).run(codigo, clienteId, total);

        const insertarDetalle = db.prepare(`
            INSERT INTO detalle_pedido
                (pedido_id, producto_id, cantidad, precio_unitario, subtotal)
            VALUES (?, ?, ?, ?, ?)
        `);

        for (const linea of lineas) {
            insertarDetalle.run(
                resultado.lastInsertRowid,
                linea.producto.id,
                linea.cantidad,
                linea.producto.precio,
                Math.round(linea.producto.precio * linea.cantidad * 100) / 100
            );
        }

        return Number(resultado.lastInsertRowid);
    });

    try {
        const id = crearPedido();
        res.status(201).json(obtenerPedido(id));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo registrar el pedido" });
    }
});

router.put("/:id", (req, res) => {
    const id = obtenerId(req.params.id);
    const cuerpo = req.body && typeof req.body === "object" ? req.body : {};
    const clienteId = obtenerId(cuerpo.cliente_id);
    const detalles = cuerpo.detalles;

    if (!id) return res.status(400).json({ error: "Identificador inválido" });
    const existente = db.prepare("SELECT id, estado FROM pedidos WHERE id = ?").get(id);
    if (!existente) return res.status(404).json({ error: "Pedido no encontrado" });
    if (existente.estado === "CANCELADO") {
        return res.status(409).json({ error: "No se puede modificar un pedido cancelado" });
    }
    if (!clienteId || !Array.isArray(detalles) || detalles.length === 0) {
        return res.status(400).json({ error: "Se requiere un cliente válido y al menos un detalle" });
    }
    if (!db.prepare("SELECT id FROM clientes WHERE id = ?").get(clienteId)) {
        return res.status(400).json({ error: "El cliente no existe" });
    }

    const cantidades = new Map();
    for (const detalle of detalles) {
        const productoId = obtenerId(detalle?.producto_id);
        const cantidad = detalle?.cantidad;
        if (!productoId || !Number.isSafeInteger(cantidad) || cantidad <= 0) {
            return res.status(400).json({ error: "Cada detalle requiere un producto válido y una cantidad entera positiva" });
        }
        cantidades.set(productoId, (cantidades.get(productoId) || 0) + cantidad);
    }

    const lineas = [];
    for (const [productoId, cantidad] of cantidades) {
        const producto = db.prepare("SELECT id, precio FROM productos WHERE id = ? AND activo = 1").get(productoId);
        if (!producto) return res.status(400).json({ error: `El producto ${productoId} no existe o está inactivo` });
        lineas.push({ producto, cantidad });
    }

    const total = Math.round(lineas.reduce((suma, linea) => suma + linea.producto.precio * linea.cantidad, 0) * 100) / 100;
    const actualizarPedido = db.transaction(() => {
        db.prepare("UPDATE pedidos SET cliente_id = ?, total = ?, actualizado_en = CURRENT_TIMESTAMP WHERE id = ?")
            .run(clienteId, total, id);
        db.prepare("DELETE FROM detalle_pedido WHERE pedido_id = ?").run(id);
        const insertar = db.prepare(`INSERT INTO detalle_pedido
            (pedido_id, producto_id, cantidad, precio_unitario, subtotal)
            VALUES (?, ?, ?, ?, ?)`);
        for (const linea of lineas) {
            insertar.run(id, linea.producto.id, linea.cantidad, linea.producto.precio,
                Math.round(linea.producto.precio * linea.cantidad * 100) / 100);
        }
    });

    try {
        actualizarPedido();
        return res.json(obtenerPedido(id));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "No se pudo actualizar el pedido" });
    }
});

router.delete("/:id", (req, res) => {
    const id = obtenerId(req.params.id);
    if (!id) return res.status(400).json({ error: "Identificador inválido" });
    const resultado = db.prepare("DELETE FROM pedidos WHERE id = ?").run(id);
    if (!resultado.changes) return res.status(404).json({ error: "Pedido no encontrado" });
    return res.status(204).end();
});

router.patch("/:id/cancelar", (req, res) => {
    const id = obtenerId(req.params.id);

    if (!id) {
        return res.status(400).json({ error: "Identificador inválido" });
    }

    const pedido = db.prepare(
        "SELECT id, estado FROM pedidos WHERE id = ?"
    ).get(id);

    if (!pedido) {
        return res.status(404).json({ error: "Pedido no encontrado" });
    }

    if (pedido.estado === "CANCELADO") {
        return res.status(409).json({ error: "El pedido ya está cancelado" });
    }

    db.prepare(`
        UPDATE pedidos
        SET estado = 'CANCELADO', actualizado_en = CURRENT_TIMESTAMP
        WHERE id = ?
    `).run(id);

    res.json(obtenerPedido(id));
});

module.exports = router;
