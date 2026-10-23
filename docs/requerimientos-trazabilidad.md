# Requerimientos y trazabilidad — Agenda Clara V1

## Requisitos funcionales de la V1

| Requisito | Funcionalidad | Desarrollo | Responsable | Evidencia | Estado |
|---|---|---|---|---|---|
| RF01 | Registrar clientes | Alta de clientes | Bruno | `server/routes/clientes.js` | Implementado en PR #6; pendiente de integración |
| RF02 | Modificar clientes | Edición de clientes | Bruno | `server/routes/clientes.js` | Implementado en PR #6; pendiente de integración |
| RF03 | Consultar clientes | Búsqueda y listado | Bruno | API e interfaz | Implementado en PR #6; pendiente de integración |
| RF04 | Registrar servicios | Alta de servicios | Bruno | `server/routes/servicios.js` | Implementado en PR #6; pendiente de integración |
| RF05 | Definir precio y duración | Datos del servicio | Bruno | API y SQLite | Implementado en PR #6; pendiente de integración |
| RF06 | Consultar servicios | Catálogo de servicios | Bruno | API e interfaz | Implementado en PR #6; pendiente de integración |
| RF07 | Registrar reservas | Crear reserva | Bruno | `server/routes/reservas.js` | Implementado en PR #6; pendiente de integración |
| RF08 | Seleccionar cliente y servicio | Asociación de reserva | Bruno | API e interfaz | Implementado en PR #6; pendiente de integración |
| RF09 | Registrar fecha y hora | Validación y registro | Bruno | API y SQLite | Implementado en PR #6; pendiente de integración |
| RF10 | Consultar reservas | Listado de reservas | Bruno | API e interfaz | Implementado en PR #6; pendiente de integración |
| RF11 | Cancelar reservas | Actualizar estado de reserva | Bruno | `server/routes/reservas.js` | Implementado en PR #6; pendiente de integración |

## Requisitos para versiones posteriores

| Requisito | Funcionalidad | Issue | Estado |
|---|---|---|---|
| RF12 | Recordatorios automáticos | #15 | Pendiente |
| RF13 | Generación de reportes | #16 | Pendiente |
| RF14 | Dashboard de indicadores | #17 | Pendiente |
| RF15 | Pagos en línea | #18 | Pendiente |
| RF16 | Historial ampliado de clientes | #19 | Pendiente |

## Verificación

- Desarrollo propuesto: PR #6.
- Revisión técnica registrada por William.
- Pruebas locales: 20 de 20 aprobadas.
- Integración a develop: pendiente.
- Pruebas de versión integrada: pendientes.
