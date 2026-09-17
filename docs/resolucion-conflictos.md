# Evidencia 5: Generación y resolución de conflictos

## Conflicto 1: README.md entre develop y feature/pedidos
- **Por qué ocurrió:** Dos ramas modificaron al mismo tiempo la misma sección del README.md (commits 765bd25 en develop y 6316aba en feature/pedidos), por lo que Git no pudo fusionarlas automáticamente.
- **Archivo afectado:** README.md
- **Cómo se solucionó:** Se identificaron las marcas de conflicto (<<<<<<<, =======, >>>>>>>), se compararon ambas versiones, se conservó el contenido combinado correcto, se ejecutó `git add README.md` y se registró la resolución con el commit de merge 5710faa.

## Conflicto 2: README.md al integrar feature/pedidos a develop
- **Por qué ocurrió:** El README.md tenía cambios divergentes entre develop y feature/pedidos al momento de integrarlas.
- **Archivo afectado:** README.md
- **Cómo se solucionó:** Se resolvió manualmente combinando ambas versiones y se registró con el commit de merge da94043 ("merge: resolver conflicto en README al integrar feature/pedidos").