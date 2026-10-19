# API REST — Sistema de Gestión de Pedidos

Base URL local: `http://localhost:3000`.

Todas las respuestas de recursos usan JSON, excepto las operaciones exitosas de eliminación, que devuelven `204 No Content`. Los IDs deben ser enteros positivos.

## Salud

### `GET /api/health`

Devuelve `200` cuando Express puede consultar SQLite. Si la base de datos no responde, devuelve `503`.

## Clientes

### `GET /api/clientes?q=texto`

Lista clientes ordenados por ID descendente. `q` es opcional y busca por nombre, documento o correo.

### `POST /api/clientes`

Cuerpo:

```json
{
  "nombre": "Cliente de prueba",
  "documento": "DOC-001",
  "correo": "cliente@example.com"
}
```

Devuelve `201`; devuelve `400` por campos o correo inválidos y `409` si el documento ya existe.

### `GET /api/clientes/:id`, `PUT /api/clientes/:id`, `DELETE /api/clientes/:id`

Consulta, actualiza o elimina un cliente. La eliminación devuelve `409` si tiene pedidos asociados.

## Productos

### `GET /api/productos?q=texto&todos=true`

Lista productos activos por defecto. `q` busca por código o nombre. `todos=true` incluye productos desactivados.

### `POST /api/productos`

Cuerpo:

```json
{
  "codigo": "TEC-001",
  "nombre": "Teclado",
  "precio": 149.9
}
```

Devuelve `201`; devuelve `400` para datos incompletos o precio no positivo y `409` si el código existe.

### `GET /api/productos/:id`, `PUT /api/productos/:id`, `DELETE /api/productos/:id`

Consulta, actualiza o desactiva lógicamente un producto. El endpoint DELETE no borra el registro físico.

## Pedidos

### `GET /api/pedidos?q=texto`

Lista pedidos por fecha/ID descendente. `q` es opcional y busca por código, cliente, nombre de producto o código de producto.

### `POST /api/pedidos`

Cuerpo:

```json
{
  "cliente_id": 1,
  "detalles": [
    { "producto_id": 1, "cantidad": 2 },
    { "producto_id": 2, "cantidad": 1 }
  ]
}
```

El backend verifica cliente, productos activos y cantidades; agrupa líneas repetidas del mismo producto, calcula subtotales y total con precios consultados en SQLite y registra el pedido y sus detalles dentro de una transacción. El precio no se acepta desde el cliente como fuente de verdad.

Respuestas principales: `201` creado; `400` si el cliente, producto o detalle es inválido; `500` si falla el registro.

### `GET /api/pedidos/:id`

Devuelve el pedido con `detalles`, incluido código y nombre de cada producto, cantidad, precio unitario y subtotal. Devuelve `400` por ID inválido y `404` si no existe.

### `PUT /api/pedidos/:id`

Actualiza cliente y detalles del pedido. Acepta el mismo esquema de cuerpo que POST. El pedido debe existir y no estar cancelado. Los cambios de cabecera y detalles se guardan en una transacción.

### `PATCH /api/pedidos/:id/cancelar`

Cambia el estado a `CANCELADO`. Devuelve `409` si ya estaba cancelado.

### `DELETE /api/pedidos/:id`

Elimina el pedido y sus detalles asociados mediante la clave foránea `ON DELETE CASCADE`. Devuelve `204` si lo elimina y `404` si no existe.

## Persistencia y pruebas

El esquema se define en `server/database/schema.sql`. La conexión habilita claves foráneas y crea las tablas e índices al iniciar. `npm test` ejecuta la suite automatizada con una base temporal.
