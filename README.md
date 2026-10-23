# Agenda Clara — Gestión de clientes, servicios y reservas

Sistema web de primera versión para una empresa de servicios que necesita centralizar las reservas que actualmente administra por llamadas, WhatsApp y hojas de cálculo.

## Alcance de la V1

- **Clientes:** registrar, consultar, buscar y modificar datos.
- **Servicios:** registrar y consultar servicios, definir precio y duración, editar y activar/desactivar servicios.
- **Reservas:** registrar una reserva asociando cliente y servicio, indicar fecha y hora, consultar/buscar y cancelar.
- **Persistencia:** SQLite con claves foráneas e índices.
- **API REST:** endpoints separados por módulo.
- **Pruebas automatizadas:** `node --test`.

Quedan para versiones posteriores: recordatorios automáticos, reportes, dashboard de indicadores, pagos en línea e historial ampliado de clientes.

## Requisitos

- Node.js 20 o una versión compatible con las dependencias del proyecto.
- npm.

## Instalación y ejecución

```bash
npm install
npm test
npm start
```

Abrir `http://localhost:3000`. Estado de la API: `http://localhost:3000/api/health`.

> La base de datos por defecto se crea en `server/database/data/agenda-clara.db`. Para pruebas o un archivo alternativo, definir `DB_PATH` antes de iniciar Node.

## API principal

| Método | Ruta | Uso |
|---|---|---|
| GET / POST | `/api/clientes` | Consultar/buscar y registrar clientes |
| GET | `/api/clientes/:id` | Consultar un cliente |
| PUT | `/api/clientes/:id` | Modificar un cliente |
| GET / POST | `/api/servicios` | Consultar/buscar y registrar servicios |
| GET / PUT | `/api/servicios/:id` | Consultar y modificar un servicio |
| PATCH | `/api/servicios/:id/estado` | Activar/desactivar un servicio |
| GET / POST | `/api/reservas` | Consultar/buscar y registrar reservas |
| GET | `/api/reservas/:id` | Consultar una reserva |
| PATCH | `/api/reservas/:id/cancelar` | Cancelar una reserva |
| GET | `/api/health` | Verificar API y base de datos |

## Organización colaborativa

La estrategia propuesta está documentada en `docs/estrategia-ramas.md`. Actividades para importar en GitHub Projects: `docs/tablero-actividades.csv`. Requisitos y trazabilidad: `docs/requerimientos-trazabilidad.md`.

**Importante:** el tablero real, las revisiones por compañeros, la resolución de un conflicto real y la liberación en GitHub deben confirmarse con evidencias del repositorio/equipo; no se consideran completados por aparecer descritos en documentación.

## Integrantes registrados en el trabajo previo

- Eduardo Jesús Jara Moya — U21302190
- Lisbert Wiliams Galvan Zamudio — U22217814
- Nery Emerson Velasquez Pacheco — U23272063
- Carlos Fernando Rivera Hipolito — U23216154
- Bruno Santiago Reyes Vicente — U19221035

Confirmen con el equipo que la lista y la participación estén actualizadas antes de entregar.
