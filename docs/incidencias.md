# Registro de incidencias y acciones preventivas

## INC-01 — Bloqueo de escritura en la unidad de trabajo

- **Síntoma observado:** Windows devolvió «Acceso denegado» al consultar o escribir `server/routes` en `D:`. La unidad reportó sistema de archivos FAT32.
- **Impacto:** no fue posible recuperar el archivo directamente en la carpeta original desde PowerShell.
- **Causa identificada:** FAT32 no implementa ACL NTFS; los comandos `takeown` e `icacls` no podían resolverlo como si fuera una carpeta NTFS.
- **Contención:** no formatear la unidad ni borrar el repositorio. Se preparó una copia de trabajo independiente en `C:` y se mantuvo intacta la carpeta original.
- **Recuperación:** se inspeccionó el archivo RAR del proyecto, el historial de Git y el stash; se recuperaron las rutas de clientes/productos desde la rama del backend y el código de pedidos desde el stash.
- **Prevención:** trabajar sobre una copia de respaldo en un sistema de archivos adecuado; evitar aplicar stashes completos cuando contienen archivos no rastreados; comprobar `git status` antes de operaciones destructivas.

## INC-02 — Instalación fallida de `better-sqlite3` en Windows

- **Síntoma observado:** `npm install` intentó ejecutar `node-gyp rebuild` y terminó porque no pudo encontrar una instalación de Python ejecutable.
- **Impacto:** las pruebas no se podían ejecutar en esa copia de Windows al no quedar instaladas las dependencias.
- **Causa identificada:** npm no pudo usar un binario precompilado en ese intento y pasó a compilación local; Python no estaba disponible en PATH y las rutas detectadas no se podían ejecutar.
- **Corrección aplicada al código:** se verificó la API en un entorno de pruebas con las dependencias disponibles, sin cambiar el motor de persistencia ni retirar `better-sqlite3`.
- **Prevención:** usar Node.js LTS compatible y conexión de red durante la instalación. Si npm vuelve a compilar el módulo, instalar Python 3 y las herramientas C/C++ requeridas, o resolver la disponibilidad del binario precompilado antes de repetir la instalación.
- **Estado:** el código corregido pasó la suite en el entorno de verificación disponible. La instalación en el equipo Windows original debe verificarse al copiar la versión recuperada a una carpeta de trabajo accesible.

## INC-03 — Ruta de pedidos no registrada en Express

- **Síntoma:** `server/app.js` montaba las rutas de clientes y productos, pero no `/api/pedidos`.
- **Impacto:** la API de pedidos no era accesible aunque existiera el archivo de ruta.
- **Corrección:** registrar `require("./routes/pedidos")` y `app.use("/api/pedidos", pedidosRoutes)`; agregar operaciones de consulta, creación, edición, cancelación y eliminación, con validaciones y transacciones.
- **Verificación:** la suite de API cubre salud, clientes, productos y pedidos.

## Reglas preventivas para el equipo

1. Crear una copia de seguridad antes de tocar permisos, ramas o archivos de recuperación.
2. No usar `git stash pop` si no se ha inspeccionado el contenido y el destino.
3. Evitar `git add .` cuando existen `node_modules`, bases de datos locales o archivos de respaldo no revisados.
4. Ejecutar comprobaciones de sintaxis y pruebas automatizadas antes de abrir una PR.
5. Adjuntar evidencia real del incidente, de la solución y de las pruebas; no sustituir capturas ni reviews por descripciones.
