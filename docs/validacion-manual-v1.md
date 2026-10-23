# Registro de validación manual — Agenda Clara V1

## Objetivo
Comprobar desde la interfaz web los flujos principales de clientes, servicios y reservas.

## Entorno
- Aplicación local: http://localhost:3000
- Base de datos: SQLite
- Fecha de validación: 20/10/2026

## Resultados

| ID | Prueba | Resultado | Evidencia observada |
|---|---|---|---|
| VM-01 | Registrar un cliente desde la interfaz | Aprobada | El usuario confirmó que pudo registrar el cliente. |
| VM-02 | Registrar un servicio | Aprobada | El usuario confirmó que el servicio quedó registrado. |
| VM-03 | Crear una reserva vinculando cliente y servicio | Aprobada | El usuario confirmó que la reserva se creó correctamente. |
| VM-04 | Cancelar la reserva creada | Aprobada | El usuario confirmó que la reserva se canceló. |

## Alcance y limitaciones
Este registro refleja las pruebas manuales realizadas y confirmadas durante la validación. No incluye capturas individuales de cada operación ni acredita pruebas adicionales que no se hayan ejecutado.

Las pruebas automatizadas se registran por separado en `docs/evidencias/pruebas-automatizadas.png`.

## Pendientes de cierre
- Completar la revisión del Pull Request por otro integrante.
- Verificar el tablero real de GitHub Projects.
- Integrar la rama en `develop` después de la revisión.
- Crear y verificar la etiqueta de versión estable `v1.0.0`.
