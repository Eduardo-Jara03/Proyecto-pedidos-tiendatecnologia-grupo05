const db = require("./connection");

try {
    const tablas = db.prepare(`
        SELECT name
        FROM sqlite_master
        WHERE type = 'table'
          AND name NOT LIKE 'sqlite_%'
        ORDER BY name
    `).all();

    console.log("Tablas creadas en SQLite:");
    console.table(tablas);

    const esperadas = [
        "clientes",
        "productos",
        "pedidos",
        "detalle_pedido"
    ];

    const creadas = tablas.map(tabla => tabla.name);
    const faltantes = esperadas.filter(nombre => !creadas.includes(nombre));

    if (faltantes.length > 0) {
        throw new Error(`Faltan tablas: ${faltantes.join(", ")}`);
    }

    console.log("VERIFICACION CORRECTA: las cuatro tablas existen.");
} finally {
    db.close();
}
