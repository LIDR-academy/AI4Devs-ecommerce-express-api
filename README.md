# API de Tienda Online

API RESTful para una tienda online desarrollada con Node.js, Express y MongoDB.

## Descripción

Este proyecto es una API para gestionar productos y categorías de una tienda online. Implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para cada entidad y establece las relaciones necesarias entre ellas.

## Estructura del Proyecto

```
app/
├── config/         # Configuración de la aplicación
├── controllers/    # Controladores para manejar las solicitudes
├── models/         # Modelos de datos (Mongoose)
├── routes/         # Definición de rutas
└── server.js       # Archivo principal del servidor
```

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript
- **Express**: Framework web para Node.js
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM (Object Document Mapper) para MongoDB
- **Cors**: Middleware para habilitar CORS
- **Body-Parser**: Middleware para procesar datos de solicitudes

## Modelos de Datos

- **Categoría**: Clasificación de productos
- **Producto**: Artículos disponibles para la venta
- **Usuario**: Usuarios del sistema
- **Pedido**: Órdenes de compra realizadas

## Requisitos

- Node.js (versión 14 o superior)
- MongoDB (local o en la nube)

## Instalación

1. Clonar el repositorio
   ```
   git clone [URL del repositorio]
   ```

2. Instalar dependencias
   ```
   npm install
   ```

3. Configurar la conexión a MongoDB en `app/config/db.config.js`

4. Iniciar el servidor
   ```
   npm start
   ```

   O en modo desarrollo:
   ```
   npm run dev
   ```

## Endpoints API

### Productos
- `GET /api/productos`: Obtener todos los productos
- `GET /api/productos/:id`: Obtener un producto por ID
- `POST /api/productos`: Crear un nuevo producto
- `PUT /api/productos/:id`: Actualizar un producto
- `DELETE /api/productos/:id`: Eliminar un producto

### Categorías
- `GET /api/categorias`: Obtener todas las categorías
- `GET /api/categorias/:id`: Obtener una categoría por ID
- `POST /api/categorias`: Crear una nueva categoría
- `PUT /api/categorias/:id`: Actualizar una categoría
- `DELETE /api/categorias/:id`: Eliminar una categoría

## Licencia

ISC 