# Informe de avance — Agenda Clara

## Carátula

**Asignatura:** Herramientas de Desarrollo

**Proyecto:** Sistema de gestión de clientes, servicios y reservas

**Grupo:** 05

**Repositorio de trabajo:** https://github.com/Eduardo-Jara03/Proyecto-pedidos-tiendatecnologia-grupo05

**Versión del informe:** Adaptación al caso de la consigna.

## Integrantes registrados

- Eduardo Jesús Jara Moya — U21302190
- Lisbert Wiliams Galvan Zamudio — U22217814
- Nery Emerson Velasquez Pacheco — U23272063
- Carlos Fernando Rivera Hipolito — U23216154
- Bruno Santiago Reyes Vicente — U19221035

Confirmar integrantes, asistencia y participación antes de la entrega.

## 1. Descripción de la solución

Agenda Clara es una aplicación web para centralizar la gestión de clientes, servicios y reservas de una empresa de servicios. La interfaz web consume una API REST implementada con Node.js y Express, mientras SQLite persiste la información y mantiene relaciones entre clientes, servicios y reservas.

## 2. Requerimientos considerados

La primera versión incluye registrar, modificar y consultar clientes; registrar y consultar servicios con precio y duración; registrar reservas asociadas a un cliente y un servicio con fecha y hora; consultar y cancelar reservas. La matriz de `docs/requerimientos-trazabilidad.md` identifica la actividad y el artefacto técnico asociado a cada requerimiento.

Se dejan para una versión posterior los recordatorios automáticos, reportes, dashboard de indicadores, pagos en línea e historial ampliado de clientes.

## 3. Organización de actividades

Se propone gestionar el trabajo en GitHub Projects con los estados Pendiente, Seleccionado, En progreso, En revisión y Hecho. El archivo `docs/tablero-actividades.csv` puede usarse como plantilla para cargar las actividades. El tablero en línea y sus capturas deben añadirse cuando el equipo lo configure realmente.

## 4. Estrategia de ramas

La estrategia propuesta utiliza `main` para la versión estable, `develop` para integración y ramas `feature/*` para funcionalidades. Los cambios se proponen mediante Pull Requests, con revisión de otro integrante y pruebas antes de integrarse. Ver `docs/estrategia-ramas.md`.

## 5. Trabajo colaborativo

La evidencia de contribuciones debe extraerse del historial real de commits, las actividades asignadas y las PR. No se atribuyen revisiones o tareas a integrantes sin comprobar los registros del repositorio y del tablero.

## 6. Integración y revisión

El procedimiento esperado es crear una PR hacia `develop`, ejecutar `npm test`, registrar comentarios del revisor, corregir observaciones y aceptar la integración solo después de la revisión. Deben incorporarse enlaces y capturas de una PR real antes de entregar.

## 7. Gestión de conflictos

La consigna solicita al menos un conflicto producido por trabajo simultáneo. `docs/conflicto-git-plantilla.md` contiene el registro que debe completarse tras reproducir y resolver un conflicto real. Esta plantilla no representa por sí sola evidencia de que el conflicto haya ocurrido.

## 8. Gestión de versiones

La V1 prevista incluye los tres módulos funcionales y pruebas automatizadas. Las funciones posteriores quedan enumeradas en `docs/versionado-v1.md`. La versión no debe declararse liberada hasta verificar los flujos manualmente, revisar e integrar las PR y crear un tag real (por ejemplo `v1.0.0`).

## 9. Pruebas y estado técnico

La adaptación incluye pruebas automatizadas de API para clientes, servicios y reservas. En el entorno de preparación se ejecutó `npm test` y se obtuvieron **20 pruebas aprobadas y 0 fallidas**. El equipo debe repetir el comando en su Windows después de copiar estos archivos y guardar la salida como evidencia propia. La interfaz debe probarse manualmente en navegador.

## 10. Evidencias que deben incorporarse

- Captura y enlace al tablero real de GitHub Projects.
- Enlace al repositorio y ramas publicadas.
- PR con revisión verificable de un compañero.
- Evidencia de contribuciones y asignación de actividades.
- Captura/registro del conflicto real y su resolución.
- Tag y commit de la versión estable.
- Evidencia de ejecución en Windows y prueba manual de la aplicación.

## Conclusiones

La adaptación técnica orienta el proyecto al caso requerido: clientes, servicios y reservas. El cumplimiento completo de la evaluación también depende de ejecutar el código en el entorno del equipo y aportar evidencias auténticas del tablero, la colaboración, las revisiones, la resolución de conflictos y la versión liberada. No debe declararse la entrega final hasta completar y verificar esos puntos.
