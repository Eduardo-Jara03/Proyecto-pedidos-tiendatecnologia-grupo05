# Matriz de trazabilidad — Agenda Clara V1

> Esta matriz identifica artefactos técnicos implementados en la propuesta de adaptación. Los responsables, revisores, enlaces de issues/PR y commit de integración deben completarse con datos reales del repositorio compartido.

| Req. | Actividad | Responsable | Desarrollo | Revisión | Integración |
|---|---|---|---|---|---|
| RF01 | Formulario y alta de clientes | Por asignar | `server/routes/clientes.js`; formulario `#clienteForm` | Pendiente de PR real | Pendiente |
| RF02 | Modificación de clientes | Por asignar | `PUT /api/clientes/:id`; edición desde tabla | Pendiente de PR real | Pendiente |
| RF03 | Consulta/búsqueda de clientes | Por asignar | `GET /api/clientes` y búsqueda UI | Pendiente de PR real | Pendiente |
| RF04 | Alta de servicios | Por asignar | `POST /api/servicios`; `server/routes/servicios.js` | Pendiente de PR real | Pendiente |
| RF05 | Precio y duración | Por asignar | Tabla `servicios` y validaciones | Pendiente de PR real | Pendiente |
| RF06 | Consulta de servicios | Por asignar | `GET /api/servicios`; catálogo UI | Pendiente de PR real | Pendiente |
| RF07 | Registrar reserva con cliente y servicio | Por asignar | `POST /api/reservas`; FK a cliente/servicio | Pendiente de PR real | Pendiente |
| RF08 | Fecha y hora | Por asignar | `reservas.fecha_hora` y validación | Pendiente de PR real | Pendiente |
| RF09 | Consultar reservas | Por asignar | `GET /api/reservas`, filtros y búsqueda | Pendiente de PR real | Pendiente |
| RF10 | Cancelar reserva | Por asignar | `PATCH /api/reservas/:id/cancelar` | Pendiente de PR real | Pendiente |

## Requerimientos de versiones posteriores

- RF11: recordatorios automáticos.
- RF12: reportes.
- RF13: dashboard de indicadores.
- RF14: pagos en línea.
- RF15: historial ampliado de clientes.

## Evidencias por incorporar

- Enlaces a issues/actividades del tablero real.
- Enlaces a ramas y commits publicados.
- PR con revisión de un integrante distinto al autor.
- Evidencia real del conflicto y su resolución.
- Tag de versión estable y enlace al commit de liberación.
