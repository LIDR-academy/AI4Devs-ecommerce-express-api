const express = require('express');
const router = express.Router();
const productosController = require('../controllers/producto.controller');

// Ruta de prueba - productos de muestra
router.get('/test', (req, res) => {
  const productosDeMuestra = [
    { id: '1', nombre: 'Laptop', precio: 1200, stock: 10 },
    { id: '2', nombre: 'Smartphone', precio: 800, stock: 15 },
    { id: '3', nombre: 'Audífonos', precio: 150, stock: 20 }
  ];
  res.status(200).json(productosDeMuestra);
});

// Crear un nuevo producto
router.post('/', productosController.create);

// Obtener todos los productos
router.get('/', productosController.findAll);

// Obtener un producto por id
router.get('/:id', productosController.findOne);

// Actualizar un producto por id
router.put('/:id', productosController.update);

// Eliminar un producto por id
router.delete('/:id', productosController.delete);

module.exports = router; 