# Matriz de trazabilidad del proyecto

## 1. Datos generales

- **Proyecto:** Sistema de pedidos para una tienda de tecnología.
- **Grupo:** 05.
- **Repositorio:** https://github.com/Eduardo-Jara03/Proyecto-pedidos-tiendatecnologia-grupo05
- **Rama de trabajo verificada:** `feature/backend-api`.
- **Propósito:** relacionar los requisitos, las actividades, los responsables y las evidencias de desarrollo, revisión e integración.

## 2. Requisitos y actividades

| ID | Requisito o componente | Actividad asociada | Responsable respaldado por el historial | Evidencia disponible | Estado verificable |
|---|---|---|---|---|---|
| R01 | Gestión de clientes | Implementar registro y listado de clientes | Pendiente de contrastar con el historial detallado | Rama `feature/clientes`; commit `279639c` | Desarrollo registrado; revisar integración |
| R02 | Gestión de productos | Implementar registro y listado de productos | Pendiente de contrastar con el historial detallado | Rama `feature/productos`; commit `ca51287` | Desarrollo registrado; revisar integración |
| R03 | Gestión de pedidos | Implementar registro, consulta, búsqueda, edición, cancelación y eliminación en la API | Bruno Reyes, según autoría de la implementación recuperada | `server/routes/pedidos.js`; `server/app.js`; pruebas en `tests/api.test.js` | Código incluido en esta copia; PR/integración en GitHub por confirmar |
| R04 | Persistencia de datos | Diseñar el esquema relacional para el sistema | Bruno Reyes, según autoría del historial | Commit `bc99443` en `feature/backend-api` | Implementación registrada; no integrada en `develop`/`main` |
| R05 | Servicios backend | Configurar Node.js y las dependencias del servidor | Bruno Reyes, según autoría del historial | Commit `cdb6d44` en `feature/backend-api` | Implementación registrada; no integrada en `develop`/`main` |
| R06 | API REST | Implementar operaciones REST para clientes, productos y pedidos | Bruno Reyes, según autoría del historial/código | Commit `3c69a2d` para clientes/productos; ruta de pedidos recuperada desde `stash@{0}` y montada en `server/app.js` | Código comprobado en copia recuperada; integración en GitHub por confirmar |
| R07 | Verificación de base de datos | Crear una utilidad de comprobación del esquema SQLite | Bruno Reyes, según autoría del historial | Commit `de5e74b` en `feature/backend-api` | Implementación registrada; no integrada en `develop`/`main` |
| R08 | Pruebas automatizadas | Probar salud, clientes, productos y pedidos | Bruno Reyes, según autoría del historial/código | `tests/api.test.js`; ejecución de verificación: 30 pruebas aprobadas, 0 fallidas | Aprobadas en el entorno de verificación disponible; repetir en el equipo de entrega |
| R09 | Trabajo colaborativo | Documentar el flujo de ramas, commits y PR | Bruno Reyes, según autoría del historial | Commit `78ac108`; PR #2 registrado en el historial | Evidencia documental disponible; verificar el PR |
| R10 | Resolución de conflictos | Registrar y explicar conflictos de integración | Carlos, Williams Galvan y Bruno aparecen en distintos registros relacionados | `docs/resolucion-conflictos.md`; merges `5710faa` y `da94043` | Conflictos documentados; adjuntar capturas verificables |
| R11 | Integración de versiones | Integrar cambios revisados en ramas compartidas | Autores de los commits de integración | Historial de merges y PR #1, #2, #3 y #4 | Integraciones registradas; revisar los detalles de cada PR |
| R12 | Entrega académica | Consolidar informe, evidencias y conclusiones | Por confirmar con el equipo | Esta matriz y los documentos de `docs/` | Pendiente de completar |
| R13 | Integración frontend/API | Consumir endpoints cuando la interfaz se sirve desde Express y conservar modo local de respaldo | Bruno Reyes, según cambios de esta copia | `src/index.html`; `server/app.js` | Implementado en la copia recuperada; validar en navegador Windows |
| R14 | Gestión de incidencias | Registrar causa, impacto, solución y prevención | Por confirmar con el equipo | `docs/incidencias.md` | Documentado; adjuntar evidencia visual si el docente la solicita |

> Nota: la autoría de un commit no demuestra por sí sola quién fue el responsable asignado de un requisito ni quién revisó el trabajo. Los responsables y estados deberán contrastarse con el tablero y los PR reales.

## 3. Flujo de trazabilidad

Para cada actividad se deberá conservar esta secuencia:

**Requisito → actividad → responsable → rama/commit → revisión del PR → integración → evidencia.**

Cuando falte una evidencia, se registrará como pendiente en lugar de darla por realizada.

## 4. Estados del tablero

El tablero del equipo deberá utilizar exactamente estos cinco estados:

1. **Pendiente:** actividad identificada, aún no seleccionada.
2. **Seleccionado:** actividad priorizada y lista para iniciar.
3. **En progreso:** actividad en desarrollo.
4. **En revisión:** cambios enviados para revisión antes de integrarlos.
5. **Hecho:** actividad revisada e integrada, con evidencia comprobable.

Las tarjetas deben vincularse, cuando corresponda, con el requisito, responsable, rama, PR y commit relacionado.

## 5. Priorización de la versión 1

### Versión 1: entrega mínima verificable
- Presentar la solución existente de clientes, productos y pedidos.
- Documentar los requisitos y las actividades del equipo.
- Mostrar el flujo de ramas y las integraciones verificables.
- Adjuntar evidencia real del tablero, de las revisiones y de la resolución de conflictos.
- Publicar una versión estable identificable y describir su alcance real.

### Mejoras posteriores
- Integrar el backend de `feature/backend-api` después de revisar sus cambios, comprobar las pruebas y completar el procedimiento de revisión acordado.
- Añadir mejoras funcionales que no sean indispensables para demostrar los requisitos de la entrega.
- Completar documentación técnica adicional si el profesor la solicita.

**Importante:** el backend no debe presentarse como parte de `main` o `develop` mientras no exista evidencia de su integración.

## 6. Evidencias que faltan por adjuntar

- Captura o enlace al tablero real con sus cinco estados.
- Evidencia de asignación y seguimiento de actividades.
- Enlaces a los PR y sus revisiones reales.
- Evidencia de que los conflictos se produjeron y de cómo se resolvieron.
- Identificación de la versión estable entregada y de sus funcionalidades incluidas y pendientes.
- Evidencia de las contribuciones individuales contrastada con el historial y los PR.
- Evidencia de ejecución de las 30 pruebas en el equipo de entrega y prueba funcional de la interfaz contra Express.

## 7. Criterio de cierre

Una actividad solo se marcará como completada cuando su resultado y la evidencia correspondiente puedan verificarse en el repositorio, el tablero o el PR. Esta matriz deberá actualizarse con los datos reales del equipo antes de generar el informe final.
