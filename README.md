# Sistema de Gestión de Pedidos – Tienda de Tecnología

## Integrantes

- Jara Moya, Eduardo Jesús — U21302190
- Galvan Zamudio, Lisbert Wiliams — U22217814
- Velasquez Pacheco, Nery Emerson — U23272063
- Rivera Hipolito, Carlos Fernando — U23216154
- Reyes Vicente, Bruno Santiago — U19221035

## Descripción del proyecto

El proyecto consiste en desarrollar una aplicación web para gestionar clientes, productos y pedidos de una tienda de tecnología.

El sistema permite centralizar las operaciones principales de la tienda, facilitando el registro, consulta y administración de la información.

El desarrollo utiliza Git y GitHub como sistema de control de versiones y repositorio remoto, permitiendo organizar el trabajo mediante ramas, commits, Pull Requests y fusiones hacia la rama `develop`.

## Funcionalidades principales

### Módulo de clientes

- Registrar clientes.
- Validar información y evitar registros duplicados.
- Listar clientes.
- Mantener los registros mediante `localStorage`.

### Módulo de productos

- Registrar productos.
- Validar códigos de producto duplicados.
- Validar precios.
- Listar productos.
- Mantener los registros mediante `localStorage`.

### Módulo de pedidos

- Registrar pedidos.
- Generar identificadores únicos de pedido.
- Seleccionar clientes y productos registrados.
- Registrar cantidades y precios.
- Calcular el total del pedido.
- Consultar pedidos.
- Buscar pedidos por código, cliente o producto.
- Editar pedidos.
- Eliminar pedidos.
- Mantener los registros mediante `localStorage`.

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- Git
- GitHub
- Visual Studio Code
- localStorage

## Organización del proyecto

```text
Proyecto-pedidos-tiendatecnologia-grupo05/
├── docs/
│   ├── evidencias-carlos.md
│   └── resolucion-conflictos.md
├── src/
│   ├── css/
│   │   └── estilos.css
│   ├── js/
│   │   └── .gitkeep
│   └── index.html
└── README.md