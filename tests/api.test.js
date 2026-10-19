const { before, after, test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const temporaryDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "tienda-api-tests-")
);

process.env.DB_PATH = path.join(temporaryDirectory, "tests.db");

const app = require("../server/app");
const db = require("../server/database/connection");

let server;
let baseUrl;

before(async () => {
    server = app.listen(0, "127.0.0.1");

    await new Promise((resolve, reject) => {
        server.once("listening", resolve);
        server.once("error", reject);
    });

    const address = server.address();
    baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
    if (server?.listening) {
        await new Promise((resolve, reject) => {
            server.close((error) => {
                if (error) reject(error);
                else resolve();
            });
        });
    }

    db.close();
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
});

async function request(endpoint, options = {}) {
    const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: {
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...options.headers
        }
    });

    const text = await response.text();

    return {
        status: response.status,
        body: text ? JSON.parse(text) : null
    };
}

function json(method, body) {
    return {
        method,
        body: JSON.stringify(body)
    };
}

test("API REST: salud, clientes, productos y validaciones", async (t) => {
    let clienteId;
    let productoId;

    await t.test("informa que la API y SQLite están operativas", async () => {
        const response = await request("/api/health");

        assert.equal(response.status, 200);
        assert.equal(response.body.estado, "correcto");
        assert.equal(response.body.baseDatos, "conectada");
    });

    await t.test("registra un cliente válido", async () => {
        const response = await request(
            "/api/clientes",
            json("POST", {
                nombre: "Cliente Automatizado",
                documento: "TEST-CLIENTE-001",
                correo: "cliente.test@example.com"
            })
        );

        assert.equal(response.status, 201);
        assert.equal(response.body.nombre, "Cliente Automatizado");
        assert.equal(response.body.documento, "TEST-CLIENTE-001");
        assert.equal(response.body.correo, "cliente.test@example.com");
        assert.ok(response.body.id > 0);

        clienteId = response.body.id;
    });

    await t.test("consulta el cliente registrado", async () => {
        const response = await request(`/api/clientes/${clienteId}`);

        assert.equal(response.status, 200);
        assert.equal(response.body.id, clienteId);
        assert.equal(response.body.documento, "TEST-CLIENTE-001");
    });

    await t.test("filtra clientes por texto", async () => {
        const response = await request(
            "/api/clientes?q=TEST-CLIENTE-001"
        );

        assert.equal(response.status, 200);
        assert.ok(Array.isArray(response.body));
        assert.ok(
            response.body.some(
                (cliente) => cliente.id === clienteId
            )
        );
    });

    await t.test("rechaza un cliente con campos obligatorios incompletos", async () => {
        const response = await request(
            "/api/clientes",
            json("POST", {
                nombre: "Cliente Incompleto"
            })
        );

        assert.equal(response.status, 400);
    });

    await t.test("rechaza un correo electrónico inválido", async () => {
        const response = await request(
            "/api/clientes",
            json("POST", {
                nombre: "Cliente Inválido",
                documento: "TEST-CLIENTE-002",
                correo: "correo-invalido"
            })
        );

        assert.equal(response.status, 400);
    });

    await t.test("rechaza documentos duplicados", async () => {
        const response = await request(
            "/api/clientes",
            json("POST", {
                nombre: "Cliente Duplicado",
                documento: "TEST-CLIENTE-001",
                correo: "duplicado.test@example.com"
            })
        );

        assert.equal(response.status, 409);
    });

    await t.test("actualiza un cliente existente", async () => {
        const response = await request(
            `/api/clientes/${clienteId}`,
            json("PUT", {
                nombre: "Cliente Actualizado",
                documento: "TEST-CLIENTE-001",
                correo: "actualizado.test@example.com"
            })
        );

        assert.equal(response.status, 200);
        assert.equal(response.body.nombre, "Cliente Actualizado");
        assert.equal(response.body.correo, "actualizado.test@example.com");
    });

    await t.test("responde 404 para un cliente inexistente", async () => {
        const response = await request("/api/clientes/999999");

        assert.equal(response.status, 404);
    });

    await t.test("registra un producto válido", async () => {
        const response = await request(
            "/api/productos",
            json("POST", {
                codigo: "TEST-PRODUCTO-001",
                nombre: "Producto Automatizado",
                precio: 149.90
            })
        );

        assert.equal(response.status, 201);
        assert.equal(response.body.codigo, "TEST-PRODUCTO-001");
        assert.equal(response.body.nombre, "Producto Automatizado");
        assert.equal(response.body.precio, 149.90);
        assert.equal(response.body.activo, 1);
        assert.ok(response.body.id > 0);

        productoId = response.body.id;
    });

    await t.test("consulta el producto registrado", async () => {
        const response = await request(`/api/productos/${productoId}`);

        assert.equal(response.status, 200);
        assert.equal(response.body.id, productoId);
        assert.equal(response.body.codigo, "TEST-PRODUCTO-001");
    });

    await t.test("rechaza precios negativos y cero", async () => {
        for (const precio of [-50, 0]) {
            const response = await request(
                "/api/productos",
                json("POST", {
                    codigo: `TEST-PRECIO-${precio}`,
                    nombre: "Producto con precio inválido",
                    precio
                })
            );

            assert.equal(response.status, 400);
        }
    });

    await t.test("rechaza productos sin precio", async () => {
        const response = await request(
            "/api/productos",
            json("POST", {
                codigo: "TEST-SIN-PRECIO",
                nombre: "Producto sin precio"
            })
        );

        assert.equal(response.status, 400);
    });

    await t.test("rechaza códigos de producto duplicados", async () => {
        const response = await request(
            "/api/productos",
            json("POST", {
                codigo: "TEST-PRODUCTO-001",
                nombre: "Producto Duplicado",
                precio: 25
            })
        );

        assert.equal(response.status, 409);
    });

    await t.test("actualiza un producto existente", async () => {
        const response = await request(
            `/api/productos/${productoId}`,
            json("PUT", {
                codigo: "TEST-PRODUCTO-001",
                nombre: "Producto Actualizado",
                precio: 179.90
            })
        );

        assert.equal(response.status, 200);
        assert.equal(response.body.nombre, "Producto Actualizado");
        assert.equal(response.body.precio, 179.90);
    });

    await t.test("permite buscar productos por código", async () => {
        const response = await request(
            "/api/productos?q=TEST-PRODUCTO-001"
        );

        assert.equal(response.status, 200);
        assert.ok(
            response.body.some(
                (producto) => producto.id === productoId
            )
        );
    });

    await t.test("elimina productos de forma lógica", async () => {
        const deletion = await request(
            `/api/productos/${productoId}`,
            { method: "DELETE" }
        );

        assert.equal(deletion.status, 204);

        const activos = await request("/api/productos");
        assert.ok(
            !activos.body.some(
                (producto) => producto.id === productoId
            )
        );

        const todos = await request("/api/productos?todos=true");
        const producto = todos.body.find(
            (item) => item.id === productoId
        );

        assert.ok(producto);
        assert.equal(producto.activo, 0);
    });

    await t.test("elimina un cliente sin pedidos asociados", async () => {
        const response = await request(
            `/api/clientes/${clienteId}`,
            { method: "DELETE" }
        );

        assert.equal(response.status, 204);
    });
});


test("API REST: gestión de pedidos y persistencia relacional", async (t) => {
    let clienteId;
    let productoId;
    let pedidoId;

    await t.test("prepara un cliente y un producto para el pedido", async () => {
        const cliente = await request(
            "/api/clientes",
            json("POST", {
                nombre: "Cliente Pedidos",
                documento: "TEST-PEDIDOS-001",
                correo: "pedidos.test@example.com"
            })
        );
        assert.equal(cliente.status, 201);
        clienteId = cliente.body.id;

        const producto = await request(
            "/api/productos",
            json("POST", {
                codigo: "TEST-PEDIDOS-001",
                nombre: "Producto para pedido",
                precio: 25.50
            })
        );
        assert.equal(producto.status, 201);
        productoId = producto.body.id;
    });

    await t.test("rechaza pedidos sin detalles", async () => {
        const response = await request(
            "/api/pedidos",
            json("POST", { cliente_id: clienteId, detalles: [] })
        );
        assert.equal(response.status, 400);
    });

    await t.test("rechaza cantidades no enteras o no positivas", async () => {
        for (const cantidad of [0, -1, 1.5, "2"]) {
            const response = await request(
                "/api/pedidos",
                json("POST", {
                    cliente_id: clienteId,
                    detalles: [{ producto_id: productoId, cantidad }]
                })
            );
            assert.equal(response.status, 400);
        }
    });

    await t.test("rechaza un cliente inexistente", async () => {
        const response = await request(
            "/api/pedidos",
            json("POST", {
                cliente_id: 999999,
                detalles: [{ producto_id: productoId, cantidad: 1 }]
            })
        );
        assert.equal(response.status, 400);
    });

    await t.test("crea pedido con detalle y calcula el total en el servidor", async () => {
        const response = await request(
            "/api/pedidos",
            json("POST", {
                cliente_id: clienteId,
                detalles: [
                    { producto_id: productoId, cantidad: 2 },
                    { producto_id: productoId, cantidad: 1 }
                ]
            })
        );

        assert.equal(response.status, 201);
        assert.match(response.body.codigo, /^PED-/);
        assert.equal(response.body.cliente_id, clienteId);
        assert.equal(response.body.estado, "REGISTRADO");
        assert.equal(response.body.total, 76.5);
        assert.equal(response.body.detalles.length, 1);
        assert.equal(response.body.detalles[0].cantidad, 3);
        assert.equal(response.body.detalles[0].subtotal, 76.5);
        pedidoId = response.body.id;
    });

    await t.test("actualiza un pedido registrado", async () => {
        const response = await request(
            `/api/pedidos/${pedidoId}`,
            json("PUT", {
                cliente_id: clienteId,
                detalles: [{ producto_id: productoId, cantidad: 4 }]
            })
        );
        assert.equal(response.status, 200);
        assert.equal(response.body.total, 102);
        assert.equal(response.body.detalles[0].cantidad, 4);
    });

    await t.test("consulta el pedido y lo encuentra mediante búsqueda", async () => {
        const detalle = await request(`/api/pedidos/${pedidoId}`);
        assert.equal(detalle.status, 200);
        assert.equal(detalle.body.id, pedidoId);
        assert.equal(detalle.body.detalles[0].producto, "Producto para pedido");
        assert.equal(detalle.body.detalles[0].cantidad, 4);

        const busqueda = await request("/api/pedidos?q=TEST-PEDIDOS-001");
        assert.equal(busqueda.status, 200);
        assert.ok(busqueda.body.some((pedido) => pedido.id === pedidoId));
    });

    await t.test("cancela un pedido y evita cancelarlo dos veces", async () => {
        const cancelado = await request(
            `/api/pedidos/${pedidoId}/cancelar`,
            { method: "PATCH" }
        );
        assert.equal(cancelado.status, 200);
        assert.equal(cancelado.body.estado, "CANCELADO");

        const repetido = await request(
            `/api/pedidos/${pedidoId}/cancelar`,
            { method: "PATCH" }
        );
        assert.equal(repetido.status, 409);
    });

    await t.test("elimina un pedido y devuelve 404 al volver a consultarlo", async () => {
        const deletion = await request(`/api/pedidos/${pedidoId}`, { method: "DELETE" });
        assert.equal(deletion.status, 204);
        const missing = await request(`/api/pedidos/${pedidoId}`);
        assert.equal(missing.status, 404);
    });

    await t.test("responde con 404 para un pedido inexistente", async () => {
        const response = await request("/api/pedidos/999999");
        assert.equal(response.status, 404);
    });
});
