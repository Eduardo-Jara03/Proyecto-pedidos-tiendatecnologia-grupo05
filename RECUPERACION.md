# Nota de recuperación

Esta carpeta es una copia de recuperación construida a partir del RAR entregado, el historial de Git incluido en ese archivo y el stash que contenía `server/routes/pedidos.js`.

- Rama activa de la copia: `feature/backend-api`.
- Se conserva el historial Git, las ramas y el stash del respaldo recibido.
- Se recuperó `server/routes/clientes.js` y `server/routes/productos.js` desde el historial versionado, y `server/routes/pedidos.js` desde el stash, extrayendo solo el código JavaScript y no el envoltorio PowerShell.
- Se registró `/api/pedidos` en `server/app.js`.
- Se amplió `tests/api.test.js` para cubrir pedidos.
- Se preservaron `README.md`, `src/` y los documentos existentes del archivo entregado.
- Los cambios de recuperación no están comprometidos ni publicados en GitHub. Revisar `git status` antes de crear commits o abrir una PR.
- La carpeta `node_modules/` está incluida en este paquete de recuperación para evitar repetir inmediatamente la instalación que falló en el equipo original. No se debe agregar `node_modules/` a Git.

La evidencia externa del tablero, las reviews de Pull Requests y la exposición no puede reconstruirse solo desde los archivos; debe obtenerse de las herramientas originales del equipo.
