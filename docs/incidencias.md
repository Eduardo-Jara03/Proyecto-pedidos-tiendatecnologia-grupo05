# Incidencias y verificación técnica

## Adaptación del alcance

El repositorio de trabajo previo se orientaba a una tienda tecnológica. La consigna oficial requiere una empresa de servicios con gestión de clientes, servicios y reservas. Se adaptaron el esquema de datos, las rutas REST, las pruebas y la interfaz para alinearlos con el caso solicitado.

## Verificación automatizada en entorno de preparación

- Comando: `npm test`.
- Resultado del entorno de preparación: 20 pruebas aprobadas, 0 fallidas.
- Incluye validaciones de clientes, servicios y reservas, relaciones entre entidades y cancelación.

El equipo debe ejecutar de nuevo el comando en Windows tras copiar los archivos y guardar la salida real como evidencia. También debe probar manualmente la interfaz.

## Instalación y ejecución

Si `npm install` falla al compilar `better-sqlite3`, registrar el mensaje completo y el entorno de Node.js/npm utilizado. No afirmar que la instalación limpia quedó resuelta sin repetirla. En el entorno donde las dependencias ya están instaladas, ejecutar:

```bash
npm test
npm start
```

Luego abrir `http://localhost:3000` y `http://localhost:3000/api/health`.

## Limitaciones pendientes

- El tablero real de GitHub Projects debe configurarse y enlazarse.
- Las PR y revisiones reales deben quedar registradas.
- El conflicto de integración debe reproducirse, resolverse y documentarse con evidencia auténtica.
- La etiqueta de versión estable debe crearse solo después de integrar y validar los cambios.
