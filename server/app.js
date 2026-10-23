const express = require("express");
const path = require("node:path");
const db = require("./database/connection");

const clientesRoutes = require("./routes/clientes");
const serviciosRoutes = require("./routes/servicios");
const reservasRoutes = require("./routes/reservas");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));

app.use("/api/clientes", clientesRoutes);
app.use("/api/servicios", serviciosRoutes);
app.use("/api/reservas", reservasRoutes);

app.get("/api/health", (req, res) => {
    try {
        const resultado = db.prepare("SELECT 1 AS operativo").get();

        res.status(200).json({
            estado: "correcto",
            mensaje: "API y base de datos operativas",
            baseDatos: resultado.operativo === 1 ? "conectada" : "desconocida"
        });
    } catch (error) {
        console.error("Error al verificar la base de datos:", error);
        res.status(503).json({
            estado: "error",
            mensaje: "La base de datos no está disponible"
        });
    }
});

app.use(express.static(path.join(__dirname, "..", "src")));

app.use("/api", (req, res) => {
    res.status(404).json({ error: "Ruta API no encontrada" });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor disponible en http://localhost:${PORT}`);
        console.log(`Verificación: http://localhost:${PORT}/api/health`);
    });
}

module.exports = app;
