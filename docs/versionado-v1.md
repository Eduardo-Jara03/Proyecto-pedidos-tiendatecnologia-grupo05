# Preparación de la versión 1.0.0

## Contenido previsto

- Registro, consulta, búsqueda y modificación de clientes.
- Registro, consulta, edición y activación/desactivación de servicios con precio y duración.
- Registro, consulta, búsqueda, filtrado y cancelación de reservas asociadas a clientes y servicios.
- Persistencia SQLite y pruebas automatizadas.

## Fuera de alcance de V1

Recordatorios automáticos, reportes, dashboard de indicadores, pagos en línea e historial ampliado de clientes.

## Criterios antes de liberar

- [ ] `npm test` aprobado en el entorno del equipo.
- [ ] Prueba manual de cada flujo en navegador.
- [ ] Revisión por un compañero mediante PR.
- [ ] Integración a `develop` verificada.
- [ ] PR de liberación revisada e integrada a `main`.
- [ ] Crear etiqueta `v1.0.0` solo tras confirmar la versión estable.
- [ ] Capturar evidencia de etiqueta/commit y lista de funcionalidades.

No se debe declarar la versión liberada hasta completar estos puntos.
