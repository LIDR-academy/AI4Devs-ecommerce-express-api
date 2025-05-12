const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoria.controller');

// Crear una nueva categoría
router.post('/', categoriasController.create);

// Obtener todas las categorías
router.get('/', categoriasController.findAll);

// Obtener una categoría por id
router.get('/:id', categoriasController.findOne);

// Actualizar una categoría por id
router.put('/:id', categoriasController.update);

// Eliminar una categoría por id
router.delete('/:id', categoriasController.delete);

// Obtener productos por categoría
router.get('/:id/productos', categoriasController.getProductosByCategoria);

module.exports = router; 