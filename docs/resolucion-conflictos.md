# GestiÃ³n de conflictos â€” Agenda Clara

La consigna requiere que el equipo produzca y resuelva al menos un conflicto real ocasionado por trabajo simultÃ¡neo. No se debe presentar un conflicto antiguo de documentaciÃ³n de la tienda tecnolÃ³gica como evidencia del sistema de reservas sin confirmar que corresponde a esta actividad.

Usar `docs/conflicto-git-plantilla.md` para registrar el caso que el equipo reproduzca durante la adaptaciÃ³n. Debe incluir ramas implicadas, origen, decisiÃ³n tomada, responsable de resoluciÃ³n, verificaciÃ³n, pruebas, commit y captura/enlace real.

## Evidencia de conflicto real de Git

**Objetivo:** demostrar un conflicto de contenido provocado por modificaciones incompatibles sobre la misma línea en dos ramas.

**Ramas involucradas:**
- `evidencia/conflicto-a`: modificación relacionada con clientes y servicios.
- `evidencia/conflicto-b`: modificación relacionada con reservas y horarios.

**Evidencia del conflicto:** al ejecutar `git merge evidencia/conflicto-a` desde `evidencia/conflicto-b`, Git informó `CONFLICT (content)` en `docs/prueba-conflicto-git.txt` y detuvo la integración automática.

**Resolución aplicada:** se editó el archivo para integrar ambos propósitos en una única línea y se eliminaron los marcadores de conflicto.

**Commit de resolución:** `75f39c3` — `fix(git): resolver conflicto entre ramas de clientes y reservas`.

**Resultado:** la resolución fue registrada en Git. El conflicto se realizó en un archivo de prueba aislado, sin modificar directamente el código funcional de la aplicación.

