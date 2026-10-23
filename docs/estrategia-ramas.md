# Estrategia de ramas e integración

## Flujo acordado para la V1

- `main`: versión estable que se presenta/entrega.
- `develop`: integración de funcionalidades verificadas.
- `feature/clientes`: cambios exclusivos del módulo de clientes.
- `feature/servicios`: catálogo de servicios, precio y duración.
- `feature/reservas`: registro, consulta y cancelación de reservas.
- `docs/entrega-academica`: requerimientos, trazabilidad, tablero e informe.

## Procedimiento

1. Crear cada rama de funcionalidad desde `develop` actualizado.
2. Mantener commits pequeños con mensajes descriptivos.
3. Ejecutar `npm test` antes de solicitar revisión.
4. Abrir Pull Request hacia `develop`, describiendo requerimientos atendidos y pruebas ejecutadas.
5. Un compañero distinto al autor revisa el cambio y registra comentarios reales.
6. Corregir observaciones y registrar la aprobación real antes de integrar.
7. Integrar a `develop` y verificar nuevamente las pruebas.
8. Cuando el conjunto esté validado, preparar PR de `develop` a `main` y crear una etiqueta de versión (por ejemplo `v1.0.0`).

## Estado de las ramas en esta entrega

Esta documentación define el flujo esperado. La rama de adaptación debe crearse en el repositorio compartido y las ramas/PR deben publicarse allí. No afirmar que una rama, revisión o integración existe hasta comprobarla en GitHub.

## Comandos de referencia

```bash
git switch develop
git pull origin develop
git switch -c feature/servicios
# cambios y pruebas
git add .
git commit -m "feat(servicios): gestionar catálogo de servicios"
git push -u origin feature/servicios
```

No usar `git add .` si existen archivos de base de datos, dependencias o artefactos que no deban publicarse; revisar siempre `git status` primero.
