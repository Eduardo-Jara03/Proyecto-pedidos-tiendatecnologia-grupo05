# Sistema de Gestión de Pedidos — Tienda de Tecnología

Aplicación web para gestionar clientes, productos y pedidos de una tienda de tecnología. El proyecto incluye frontend, API REST con Express y persistencia relacional SQLite.

## Integrantes

- Jara Moya, Eduardo Jesús — U21302190
- Galvan Zamudio, Lisbert Wiliams — U22217814
- Velasquez Pacheco, Nery Emerson — U23272063
- Rivera Hipolito, Carlos Fernando — U23216154
- Reyes Vicente, Bruno Santiago — U19221035

## Funcionalidades

- **Clientes:** registro, consulta, búsqueda, actualización, validación de correo y prevención de documentos duplicados.
- **Productos:** registro, consulta, búsqueda, actualización, validación de precio/código y eliminación lógica.
- **Pedidos:** creación transaccional con detalles, cálculo del total en el servidor, búsqueda, consulta, edición, cancelación y eliminación.
- **Persistencia:** SQLite con claves foráneas, restricciones e índices.
- **Frontend:** interfaz existente de TechStore; cuando se sirve desde Express consume la API. Si se abre directamente como archivo local o la API no está disponible, conserva el modo local basado en `localStorage`.
- **Pruebas:** pruebas automatizadas de salud, clientes, productos, pedidos y validaciones.

## Requisitos

- Node.js 22 LTS recomendado.
- npm.
- Conexión a Internet durante la primera instalación de dependencias.

`better-sqlite3` es un módulo nativo. npm normalmente descarga un binario precompilado compatible. Si intenta compilarlo desde código fuente, se necesita Python 3 y las herramientas de compilación de C/C++ correspondientes a la plataforma.

## Instalación y ejecución

Desde la raíz de esta **copia de recuperación**, las dependencias de `node_modules/` se incluyen para evitar repetir el fallo de instalación que se presentó en el equipo original. Primero ejecuta:

```powershell
npm.cmd test
npm.cmd start
```

Abrir `http://localhost:3000`. La comprobación de salud está en `http://localhost:3000/api/health`.

Si se trabaja desde un clon limpio y no se incluye `node_modules/`, ejecutar `npm.cmd install` con conexión a Internet. La base de datos se crea automáticamente en `server/database/data/tiendatecnologia.db`. Para las pruebas se usa una base temporal aislada, sin modificar esa base local.

## API REST

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/health` | Estado de API y SQLite |
| GET, POST | `/api/clientes` | Listar/buscar y registrar clientes |
| GET, PUT, DELETE | `/api/clientes/:id` | Consultar, actualizar o eliminar cliente |
| GET, POST | `/api/productos` | Listar/buscar y registrar productos |
| GET, PUT, DELETE | `/api/productos/:id` | Consultar, actualizar o desactivar producto |
| GET, POST | `/api/pedidos` | Listar/buscar y registrar pedidos |
| GET, PUT, DELETE | `/api/pedidos/:id` | Consultar, actualizar o eliminar pedido |
| PATCH | `/api/pedidos/:id/cancelar` | Cancelar pedido registrado |

Los detalles de los endpoints, validaciones y códigos HTTP están en [`docs/api-rest.md`](docs/api-rest.md).

## Estructura

```text
.
├── docs/
│   ├── api-rest.md
│   ├── evidencias-carlos.md
│   ├── incidencias.md
│   ├── informe-avance-02.md
│   ├── matriz-trazabilidad.md
│   └── resolucion-conflictos.md
├── server/
│   ├── app.js
│   ├── database/
│   │   ├── connection.js
│   │   ├── schema.sql
│   │   └── verify.js
│   └── routes/
│       ├── clientes.js
│       ├── pedidos.js
│       └── productos.js
├── src/
│   ├── css/estilos.css
│   └── index.html
├── tests/api.test.js
├── package.json
└── package-lock.json
```

## Flujo de colaboración

El repositorio usa ramas por funcionalidad/documentación, commits descriptivos y Pull Requests para revisión antes de integrar en `develop`. Las ramas e integraciones que aparecen en el historial se pueden comprobar en Git. No se deben presentar como aprobaciones formales los comentarios que no estén registrados como reviews de GitHub.

## Estado de verificación de esta copia recuperada

- Sintaxis comprobada en `server/app.js`, `server/routes/pedidos.js`, `tests/api.test.js` y el JavaScript incrustado en `src/index.html`.
- Suite automatizada ejecutada: **30 pruebas aprobadas, 0 fallidas** en el entorno de verificación disponible.
- Las evidencias externas del tablero, las revisiones reales de PR y la exposición deben adjuntarse desde las herramientas originales del equipo; no se fabrican capturas ni aprobaciones.

## Entrega académica

Consultar [`docs/informe-avance-02.md`](docs/informe-avance-02.md) para el resumen del avance, gestión del trabajo, trazabilidad, incidencias, resolución de conflictos y lista de evidencias que deben adjuntarse.
