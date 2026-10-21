# Informe de entrega — Agenda Clara V1
## Sistema de gestión de clientes, servicios y reservas

**Asignatura:** Herramientas de Desarrollo  
**Grupo:** 05  
**Repositorio:** https://github.com/Eduardo-Jara03/Proyecto-pedidos-tiendatecnologia-grupo05  
**Versión del documento:** Informe adaptado a la consigna oficial

### Integrantes registrados
- Eduardo Jesús Jara Moya — U21302190
- Lisbert Wiliams Galvan Zamudio — U22217814
- Nery Emerson Velasquez Pacheco — U23272063
- Carlos Fernando Rivera Hipolito — U23216154
- Bruno Santiago Reyes Vicente — U19221035

> Antes de entregar, el equipo debe confirmar la lista, las responsabilidades reales y la participación de cada integrante. La consigna también limita la calificación de quien no asista a la sustentación.

## 1. Descripción de la solución

Agenda Clara es una aplicación web de primera versión destinada a una empresa de servicios que necesita centralizar la administración de clientes, catálogo de servicios y reservas. La interfaz web se comunica con una API REST desarrollada con Node.js y Express. La información se persiste en SQLite con relaciones entre clientes, servicios y reservas.

## 2. Requerimientos y alcance de la V1

| Código | Requerimiento | Versión |
|---|---|---|
| RF01 | Registrar clientes | V1 |
| RF02 | Modificar información de clientes | V1 |
| RF03 | Consultar y buscar clientes | V1 |
| RF04 | Registrar servicios | V1 |
| RF05 | Establecer precio y duración de los servicios | V1 |
| RF06 | Consultar servicios | V1 |
| RF07 | Registrar reservas | V1 |
| RF08 | Seleccionar cliente y servicio para la reserva | V1 |
| RF09 | Registrar fecha y hora de la reserva | V1 |
| RF10 | Consultar reservas | V1 |
| RF11 | Cancelar reservas | V1 |
| RF12 | Recordatorios automáticos | Versión posterior |
| RF13 | Reportes | Versión posterior |
| RF14 | Dashboard de indicadores | Versión posterior |
| RF15 | Pagos en línea | Versión posterior |
| RF16 | Historial ampliado de clientes | Versión posterior |

Los requerimientos y las actividades asociadas también están descritos en `docs/requerimientos-trazabilidad.md` y `docs/matriz-trazabilidad.md`.

## 3. Organización del proyecto y repositorio

El proyecto se trabaja en el repositorio GitHub indicado en la carátula. El historial de Git registra los cambios del código. Para que la organización quede demostrada, el equipo debe mantener el repositorio y el tablero accesibles, y aportar los enlaces de las ramas y Pull Requests que correspondan a esta adaptación.

## 4. Gestión de actividades

La consigna solicita un tablero con cinco estados: **Pendiente, Seleccionado, En progreso, En revisión y Hecho**. El archivo `docs/tablero-actividades.csv` sirve como base para cargar las tareas en GitHub Projects u otra herramienta colaborativa elegida por el equipo.

**Evidencia pendiente de incorporar:** enlace al tablero real y capturas donde se vean los cinco estados, las tareas, responsables y evolución. La plantilla CSV no sustituye al tablero publicado.

## 5. Estrategia de ramas y desarrollo paralelo

La estrategia propuesta es:
- `main`: versión estable.
- `develop`: integración de funcionalidades verificadas.
- `feature/clientes`: cambios del módulo de clientes.
- `feature/servicios`: cambios del módulo de servicios.
- `feature/reservas`: cambios del módulo de reservas.
- `docs/documentacion`: documentación, trazabilidad e informe.

Las ramas deben crearse y publicarse en el repositorio real. Cada cambio se debe proponer mediante Pull Request hacia la rama de integración, con revisión antes de aceptar la integración. Esta lista describe la estrategia propuesta; no afirma que todas las ramas ya estén publicadas.

## 6. Funcionalidades técnicas implementadas en la adaptación

La versión adaptada incluye:
- API para registrar, consultar/buscar y modificar clientes.
- API para registrar, consultar y modificar servicios, con precio y duración; también permite activar o desactivar servicios.
- API para registrar, consultar/buscar y cancelar reservas, vinculadas a un cliente y un servicio, con fecha y hora.
- Persistencia SQLite y validaciones básicas de datos.
- Pruebas automatizadas con Node.js Test Runner.

Rutas principales documentadas en `README.md`:
- `/api/clientes`
- `/api/servicios`
- `/api/reservas`
- `/api/health`

## 7. Pruebas y validación técnica

En el entorno de preparación se ejecutó `npm test`: **20 pruebas aprobadas, 0 fallidas**. Las pruebas cubren salud de API/SQLite, registro y modificación de clientes, validaciones, servicios, registro y consulta de reservas, asociación entre entidades y cancelación.

**Validación en Windows:** se ejecutó `npm.cmd test` en el entorno local del proyecto y se obtuvieron 20 pruebas aprobadas, 0 fallidas, 0 canceladas y 0 omitidas. La evidencia de las pruebas automatizadas está registrada en `docs/evidencias/pruebas-automatizadas.png`.

**Validación manual:** se confirmó en el navegador el registro de clientes, el registro de servicios, el registro de reservas y la cancelación de reservas. Estos resultados están documentados en `docs/validacion-manual-v1.md`. No se afirma que existan capturas individuales de cada flujo.

## 8. Trabajo colaborativo y responsabilidades

Los integrantes y responsabilidades deben comprobarse usando commits, asignaciones del tablero y Pull Requests. No se deben atribuir tareas, revisiones o aprobaciones a una persona sin evidencia verificable.

**Evidencias pendientes:** tabla o capturas de tareas asignadas, contribuciones por integrante, commits relevantes y enlaces a PR con revisión auténtica de un compañero.

## 9. Integración y revisión de cambios

Procedimiento propuesto:
1. El responsable desarrolla en su rama de funcionalidad.
2. Ejecuta las pruebas correspondientes.
3. Abre una Pull Request hacia `develop`.
4. Otro integrante revisa el cambio y registra observaciones.
5. El autor corrige lo necesario.
6. Se integra tras la revisión y la validación.

**Evidencia pendiente:** enlace a una Pull Request real que muestre revisión previa a la aceptación. La descripción del procedimiento no sustituye esa evidencia.

## 10. Gestión de conflictos

Se reprodujo un conflicto real de contenido de Git al integrar la rama `evidencia/conflicto-a` en `evidencia/conflicto-b`. Ambas ramas modificaron la misma línea de `docs/prueba-conflicto-git.txt`; Git detuvo la integración automática y requirió una resolución manual.

El conflicto se resolvió integrando los dos objetivos en una única línea. El procedimiento y sus limitaciones están registrados en `docs/resolucion-conflictos.md`. Los commits de preparación, variantes, resolución y documentación se identifican en ese archivo.

**Alcance de la evidencia:** el conflicto ocurrió en un archivo de prueba de Git, no en el código funcional de clientes, servicios o reservas. La participación de otro integrante no se considera demostrada sin evidencia adicional.

## 11. Gestión de versiones y liberación

La V1 prevista incluye gestión de clientes, servicios y reservas. Se excluyen de esta versión los recordatorios automáticos, reportes, dashboard, pagos en línea e historial ampliado.

La versión estable deberá identificarse con un tag Git (por ejemplo, `v1.0.0`) únicamente después de integrar y verificar las funcionalidades. **No se afirma en este informe que la etiqueta o la liberación final ya exista.**

## 12. Trazabilidad

La correspondencia exigida es:

**Requerimiento → Actividad → Responsable → Desarrollo → Revisión → Integración**

La matriz debe incluir para cada requisito su código, tarea, responsable real, rama/commit o archivo asociado, PR/revisor y evidencia de integración. Los campos que todavía no tengan evidencia deben completarse antes de la entrega.

## 13. Lista de verificación final

- [ ] Confirmar nombres, códigos y participación de integrantes.
- [ ] Publicar las ramas que se hayan acordado para la adaptación.
- [ ] Crear y compartir el tablero con los cinco estados.
- [ ] Completar responsables y prioridades de las actividades.
- [x] Ejecutar las pruebas automatizadas en Windows: 20 aprobadas y 0 fallidas; evidencia en `docs/evidencias/pruebas-automatizadas.png`.
- [x] Validar manualmente en navegador el registro de clientes, servicios y reservas, y la cancelación de reservas; resultados en `docs/validacion-manual-v1.md`.
- [ ] Obtener una revisión auténtica de un integrante distinto al autor en el Pull Request.
- [x] Reproducir, resolver y documentar un conflicto real de contenido de Git; alcance y limitaciones en `docs/resolucion-conflictos.md`.
- [ ] Integrar y verificar la V1.
- [ ] Crear el tag de versión estable después de validar.
- [ ] Incorporar capturas y enlaces reales en el PDF definitivo.
- [ ] Asegurar asistencia a la sustentación.

## 14. Conclusiones

La adaptación de Agenda Clara orienta el código a los requerimientos funcionales de clientes, servicios y reservas de la consigna. En el entorno de preparación, las pruebas automatizadas registraron 20 aprobaciones y ninguna falla. Sin embargo, la calificación también depende de evidencias reales de organización, tablero, colaboración, revisión, resolución de conflicto, integración y versión liberada. Por ello, este informe distingue entre lo implementado técnicamente y las evidencias que el equipo debe completar antes de declarar la entrega final.
