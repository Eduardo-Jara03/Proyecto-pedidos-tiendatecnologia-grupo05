# API REST — Agenda Clara V1

Base URL local: `http://localhost:3000/api`

## Salud

- `GET /health`: comprueba la API y la conexión con SQLite.

## Clientes

- `GET /clientes?q=texto`: lista clientes o filtra por nombre, documento o correo.
- `GET /clientes/:id`: consulta un cliente.
- `POST /clientes`: registra `{ "nombre", "documento", "correo" }`.
- `PUT /clientes/:id`: modifica los mismos campos.

## Servicios

- `GET /servicios?q=texto`: consulta/busca servicios.
- `GET /servicios/:id`: consulta un servicio.
- `POST /servicios`: registra `{ "nombre", "descripcion", "precio", "duracion_minutos" }`.
- `PUT /servicios/:id`: actualiza nombre, descripción, precio y duración.
- `PATCH /servicios/:id/estado`: recibe `{ "activo": true }` o `false`.

## Reservas

- `GET /reservas?q=texto&estado=RESERVADA`: consulta/busca y filtra reservas.
- `GET /reservas/:id`: consulta una reserva.
- `POST /reservas`: recibe `cliente_id`, `servicio_id`, `fecha_hora` (`YYYY-MM-DDTHH:mm`) y `observaciones` opcional.
- `PATCH /reservas/:id/cancelar`: cambia el estado a `CANCELADA`; no elimina el registro.

Las reservas relacionan claves foráneas de cliente y servicio. No se permite crear una reserva para un servicio inactivo o un cliente inexistente. La API devuelve códigos HTTP 4xx para datos inválidos y conflictos de negocio.

## Ejemplo de alta de reserva

```json
{
  "cliente_id": 1,
  "servicio_id": 1,
  "fecha_hora": "2027-03-15T10:30",
  "observaciones": "Primera visita"
}
```

Ejecutar `npm test` para correr las pruebas automatizadas de la API.
