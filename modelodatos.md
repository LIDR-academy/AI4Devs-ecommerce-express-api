# Modelo de Datos - API de Tienda Online

Este documento describe los modelos de datos utilizados en la API de tienda online, sus atributos y relaciones.

## Diagrama de Entidad-Relación

```
+-------------+      +------------+
|  Categoría  |<-----+  Producto  |
+-------------+      +------------+
                           ^
                           |
+-------------+      +------------+
|   Usuario   +----->+   Pedido   |
+-------------+      +------------+
```

## Modelos

### Categoría

Representa las categorías de productos de la tienda.

| Atributo    | Tipo     | Descripción                                | Requerido |
|-------------|----------|--------------------------------------------|-----------|
| nombre      | String   | Nombre de la categoría                     | Sí        |
| descripcion | String   | Descripción detallada de la categoría      | No        |
| activa      | Boolean  | Indica si la categoría está activa         | No        |
| createdAt   | Date     | Fecha de creación                          | Auto      |
| updatedAt   | Date     | Fecha de última actualización              | Auto      |

### Producto

Representa los artículos disponibles para la venta.

| Atributo    | Tipo           | Descripción                               | Requerido |
|-------------+----------------+-------------------------------------------+-----------|
| nombre      | String         | Nombre del producto                       | Sí        |
| descripcion | String         | Descripción detallada del producto        | No        |
| precio      | Number         | Precio del producto                       | Sí        |
| stock       | Number         | Cantidad disponible en inventario         | Sí        |
| imagenes    | Array[String]  | URLs de las imágenes del producto         | No        |
| categoria   | ObjectId       | Referencia a la categoría del producto    | Sí        |
| destacado   | Boolean        | Indica si el producto es destacado        | No        |
| createdAt   | Date           | Fecha de creación                         | Auto      |
| updatedAt   | Date           | Fecha de última actualización             | Auto      |

### Usuario

Representa a los usuarios registrados en el sistema.

| Atributo    | Tipo           | Descripción                               | Requerido |
|-------------+----------------+-------------------------------------------+-----------|
| nombre      | String         | Nombre del usuario                        | Sí        |
| apellido    | String         | Apellido del usuario                      | Sí        |
| email       | String         | Correo electrónico (único)                | Sí        |
| password    | String         | Contraseña (mínimo 8 caracteres)          | Sí        |
| direccion   | Object         | Objeto con la dirección del usuario       | No        |
| telefono    | String         | Número de teléfono                        | No        |
| role        | String         | Rol del usuario (cliente, admin)          | Sí        |
| activo      | Boolean        | Indica si la cuenta está activa           | No        |
| createdAt   | Date           | Fecha de creación                         | Auto      |
| updatedAt   | Date           | Fecha de última actualización             | Auto      |

#### Objeto Dirección

| Atributo      | Tipo    | Descripción               |
|---------------|---------|---------------------------|
| calle         | String  | Dirección postal          |
| ciudad        | String  | Ciudad                    |
| estado        | String  | Estado o provincia        |
| codigoPostal  | String  | Código postal             |
| pais          | String  | País                      |

### Pedido

Representa las órdenes de compra realizadas.

| Atributo       | Tipo           | Descripción                               | Requerido |
|----------------+----------------+-------------------------------------------+-----------|
| usuario        | ObjectId       | Referencia al usuario que hizo el pedido  | Sí        |
| productos      | Array[Object]  | Lista de productos en el pedido           | Sí        |
| total          | Number         | Monto total del pedido                    | Sí        |
| estado         | String         | Estado del pedido                         | Sí        |
| direccionEnvio | String         | Dirección de entrega                      | Sí        |
| fechaCompra    | Date           | Fecha en que se realizó la compra         | Auto      |
| createdAt      | Date           | Fecha de creación                         | Auto      |
| updatedAt      | Date           | Fecha de última actualización             | Auto      |

#### Objeto Item de Pedido

| Atributo    | Tipo      | Descripción                               | Requerido |
|-------------|-----------|-------------------------------------------|-----------|
| producto    | ObjectId  | Referencia al producto                    | Sí        |
| cantidad    | Number    | Cantidad de unidades del producto         | Sí        |
| precio      | Number    | Precio unitario al momento de la compra   | Sí        |
| subtotal    | Number    | Subtotal (precio * cantidad)              | Sí        |

## Enumeraciones

### Estados de Pedido

- `pendiente`: El pedido ha sido creado pero aún no ha sido procesado
- `enviado`: El pedido ha sido procesado y está en camino 
- `entregado`: El pedido ha sido entregado al cliente
- `cancelado`: El pedido ha sido cancelado

### Roles de Usuario

- `cliente`: Usuario normal que puede realizar compras
- `admin`: Usuario con privilegios administrativos

## Relaciones

1. **Producto - Categoría**: Muchos a uno. Cada producto pertenece a una categoría.
2. **Pedido - Usuario**: Muchos a uno. Cada pedido pertenece a un usuario.
3. **Pedido - Producto**: Muchos a muchos. Un pedido puede contener varios productos y un producto puede estar en varios pedidos.

## Índices

- `categoria.nombre`: Índice único para optimizar búsquedas por nombre de categoría
- `producto.nombre`: Índice para optimizar búsquedas por nombre de producto
- `usuario.email`: Índice único para garantizar que no haya duplicados
- `pedido.usuario`: Índice para optimizar búsquedas de pedidos por usuario

## Validaciones

- El precio y stock de los productos deben ser números positivos
- El email de usuario debe tener un formato válido
- La contraseña debe tener al menos 8 caracteres
- Los roles de usuario solo pueden ser "cliente" o "admin"
- Los estados de pedido solo pueden ser "pendiente", "enviado", "entregado" o "cancelado"
- La cantidad de productos en un pedido debe ser al menos 1 