# Evidencia 5: Generación y resolución de conflictos

## Conflicto 1: README.md entre develop y feature/pedidos
- **Por qué ocurrió:** Dos ramas modificaron al mismo tiempo la misma sección del README.md (commits 765bd25 en develop y 6316aba en feature/pedidos), por lo que Git no pudo fusionarlas automáticamente.
- **Archivo afectado:** README.md
- **Cómo se solucionó:** Se identificaron las marcas de conflicto (<<<<<<<, =======, >>>>>>>), se compararon ambas versiones, se conservó el contenido combinado correcto, se ejecutó `git add README.md` y se registró la resolución con el commit de merge 5710faa.

## Conflicto 2: README.md al integrar feature/pedidos a develop
- **Por qué ocurrió:** El README.md tenía cambios divergentes entre develop y feature/pedidos al momento de integrarlas.
- **Archivo afectado:** README.md
- **Cómo se solucionó:** Se resolvió manualmente combinando ambas versiones y se registró con el commit de merge da94043 ("merge: resolver conflicto en README al integrar feature/pedidos").
## Conflicto 3: README.md al integrar develop a main
- **Por qué ocurrió:** Al fusionar develop en main, ambas ramas tenían versiones distintas de la misma zona del README.md (main aportaba las secciones "Control de versiones" y "Flujo de trabajo con Git y GitHub"; develop aportaba "Estructura del proyecto"), por lo que Git no pudo combinarlas automáticamente.
- **Archivo afectado:** README.md
- **Cómo se solucionó:** Se resolvió con el editor de merges de VS Code aceptando la combinación de ambas versiones (Accept Combination) para conservar las secciones de las dos ramas, y se registró con el commit de merge en main.