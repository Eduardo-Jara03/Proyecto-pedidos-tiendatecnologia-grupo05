# Matriz de trazabilidad — Agenda Clara V1

Esta matriz relaciona los requisitos funcionales con los Issues, el desarrollo, las pruebas y la revisión.

## Requisitos de la versión 1

| Requisito | Descripción | Issue | Responsable de desarrollo | Implementación | Revisión |
|---|---|---|---|---|---|
| RF01 | Registrar clientes | #7 | Bruno | `server/routes/clientes.js` | PR #6, pendiente de aprobación |
| RF02 | Modificar clientes | #7 | Bruno | `server/routes/clientes.js` | PR #6, pendiente de aprobación |
| RF03 | Consultar y buscar clientes | #7 | Bruno | API de clientes e interfaz | PR #6, pendiente de aprobación |
| RF04 | Registrar servicios | #8 | Bruno | `server/routes/servicios.js` | PR #6, pendiente de aprobación |
| RF05 | Definir precio y duración | #8 | Bruno | Servicios y SQLite | PR #6, pendiente de aprobación |
| RF06 | Consultar servicios | #8 | Bruno | API de servicios e interfaz | PR #6, pendiente de aprobación |
| RF07 | Registrar reservas | #9 | Bruno | `server/routes/reservas.js` | PR #6, pendiente de aprobación |
| RF08 | Seleccionar cliente y servicio | #9 | Bruno | Reservas e interfaz | PR #6, pendiente de aprobación |
| RF09 | Registrar fecha y hora | #9 | Bruno | Reservas y validaciones | PR #6, pendiente de aprobación |
| RF10 | Consultar reservas | #10 | Bruno | API de reservas e interfaz | PR #6, pendiente de aprobación |
| RF11 | Cancelar reservas | #10 | Bruno | API de reservas | PR #6, pendiente de aprobación |

## Requisitos de versiones futuras

| Requisito | Descripción | Issue | Estado |
|---|---|---|---|
| RF12 | Recordatorios automáticos | #15 | Pendiente |
| RF13 | Generación de reportes | #16 | Pendiente |
| RF14 | Dashboard de indicadores | #17 | Pendiente |
| RF15 | Pagos en línea | #18 | Pendiente |
| RF16 | Historial ampliado de clientes | #19 | Pendiente |

## Evidencias de verificación

- Desarrollo: PR #6, rama `feature/adaptacion-servicios-reservas`.
- Revisión técnica: William, registrada en PR #6.
- Pruebas automatizadas: 20 de 20 aprobadas localmente en la rama del PR #6.
- Validación manual: clientes, servicios, reservas y `/api/health`.
- Integración a `develop`: pendiente de aprobación y fusión del PR #6.
- Validación posterior a la integración: pendiente.
- Versión estable `v1.0.0`: pendiente.
