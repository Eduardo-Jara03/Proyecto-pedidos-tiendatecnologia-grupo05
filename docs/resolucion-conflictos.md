# Gestión de conflictos — Agenda Clara

## Objetivo

Registrar la reproducción, resolución y verificación de un conflicto de contenido de Git durante la preparación de la entrega.

## Ramas involucradas

- `evidencia/conflicto-base`: archivo inicial para reproducir el caso.
- `evidencia/conflicto-a`: primera variante del contenido.
- `evidencia/conflicto-b`: segunda variante y rama donde se resolvió el conflicto.

## Origen del conflicto

Las ramas A y B modificaron la misma línea del archivo `docs/prueba-conflicto-git.txt` con contenidos diferentes.

Al integrar la rama A en la rama B, Git informó:

`CONFLICT (content): Merge conflict in docs/prueba-conflicto-git.txt`

La integración automática se detuvo y fue necesaria una resolución manual.

## Resolución aplicada

Se integraron ambos objetivos en una única línea:

`Resolucion: se integran la gestion de clientes y servicios con la gestion de reservas y horarios.`

La decisión permitió conservar el propósito de ambas variantes sin mantener los marcadores de conflicto de Git.

## Verificación y evidencia

- Preparación del archivo: commit `82f49bd`.
- Primera variante: commit `685d535`.
- Segunda variante: commit `2e25c5f`.
- Resolución del conflicto: commit `75f39c3`.
- Documentación del caso: commit `283520c`.
- Rama publicada con la resolución: `evidencia/conflicto-b`.

Este conflicto demuestra una resolución real de Git sobre un archivo de evidencia. No debe describirse como un conflicto surgido en el código funcional de clientes, servicios o reservas.

## Alcance y limitaciones

El caso documenta el procedimiento técnico de conflicto, las ramas involucradas y la decisión adoptada. La participación de otro integrante debe confirmarse con evidencia real; no se atribuyen revisiones ni contribuciones que no estén verificadas.
