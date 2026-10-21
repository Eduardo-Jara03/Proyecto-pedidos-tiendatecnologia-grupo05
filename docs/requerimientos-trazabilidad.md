# Requerimientos, priorización y trazabilidad — Agenda Clara V1

## Primera versión

| ID | Requerimiento | Actividad | Responsable propuesto* | Evidencia técnica | Estado técnico actual |
|---|---|---|---|---|---|
| RF01 | Registrar clientes | Formulario y endpoint POST clientes | Integrante por confirmar | `server/routes/clientes.js`, interfaz Clientes | Implementado; validar manualmente |
| RF02 | Modificar clientes | Edición de datos de cliente | Integrante por confirmar | PUT `/api/clientes/:id` y formulario | Implementado; validar manualmente |
| RF03 | Consultar clientes | Listado, búsqueda y consulta individual | Integrante por confirmar | GET `/api/clientes` | Implementado; pruebas automatizadas |
| RF04 | Registrar servicios | Formulario y endpoint POST servicios | Integrante por confirmar | `server/routes/servicios.js` | Implementado; pruebas automatizadas |
| RF05 | Establecer precio y duración | Validar precio y minutos | Integrante por confirmar | Tabla `servicios`, validaciones REST | Implementado; pruebas automatizadas |
| RF06 | Consultar servicios | Catálogo y búsqueda | Integrante por confirmar | GET `/api/servicios` | Implementado; pruebas automatizadas |
| RF07 | Registrar reservas | Crear reserva con cliente/servicio | Integrante por confirmar | `server/routes/reservas.js` | Implementado; pruebas automatizadas |
| RF08 | Registrar fecha y hora | Validar fecha/hora y persistirla | Integrante por confirmar | `reservas.fecha_hora` | Implementado; pruebas automatizadas |
| RF09 | Consultar reservas | Listado, búsqueda y filtros | Integrante por confirmar | GET `/api/reservas` | Implementado; pruebas automatizadas |
| RF10 | Cancelar reservas | Cambio de estado a CANCELADA | Integrante por confirmar | PATCH `/api/reservas/:id/cancelar` | Implementado; pruebas automatizadas |

*Los responsables deben asignarse en el tablero y confirmarse con el equipo. No se inventan asignaciones ni revisiones retroactivas.

## Versiones posteriores

| ID | Funcionalidad | Prioridad | Motivo de postergación |
|---|---|---|---|
| RF11 | Recordatorios automáticos | V2 | Requiere canal de envío y configuración externa |
| RF12 | Reportes | V2 | No es requisito mínimo de la V1 |
| RF13 | Dashboard de indicadores | V2 | Depende de definir indicadores y datos operativos |
| RF14 | Pagos en línea | V2 | Requiere proveedor, seguridad y flujo de pagos |
| RF15 | Historial ampliado de clientes | V2 | Puede construirse después de estabilizar las reservas |

## Flujo de trazabilidad requerido

`Requerimiento → Actividad → Responsable → Desarrollo → Revisión → Integración`.

Para cada RF, el equipo debe completar la actividad/issue, responsable real, rama/commit/PR, revisor real, resultado de la revisión y commit de integración. Los enlaces e identificadores deben añadirse una vez existan en GitHub.
