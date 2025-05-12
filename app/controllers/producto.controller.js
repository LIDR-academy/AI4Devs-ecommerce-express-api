const Producto = require('../models/producto.model');

// Crear un nuevo producto
exports.create = async (req, res) => {
  try {
    // Validar request
    if (!req.body.nombre || !req.body.precio) {
      return res.status(400).json({
        mensaje: 'El nombre y precio del producto son obligatorios'
      });
    }

    // Crear un producto
    const producto = new Producto({
      nombre: req.body.nombre,
      precio: req.body.precio,
      stock: req.body.stock || 0
    });

    // Guardar producto en la base de datos
    const productoGuardado = await producto.save();
    
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message || 'Error al crear el producto'
    });
  }
};

// Obtener todos los productos
exports.findAll = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message || 'Error al obtener los productos'
    });
  }
};

// Obtener un producto por id
exports.findOne = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    
    if (!producto) {
      return res.status(404).json({
        mensaje: `No se encontró el producto con id ${req.params.id}`
      });
    }
    
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al obtener el producto con id ${req.params.id}`
    });
  }
};

// Actualizar un producto
exports.update = async (req, res) => {
  try {
    // Validar request
    if (!req.body) {
      return res.status(400).json({
        mensaje: 'Los datos para actualizar no pueden estar vacíos'
      });
    }

    const id = req.params.id;
    
    const productoActualizado = await Producto.findByIdAndUpdate(
      id, 
      req.body,
      { new: true, useFindAndModify: false }
    );
    
    if (!productoActualizado) {
      return res.status(404).json({
        mensaje: `No se pudo actualizar el producto con id ${id}. Tal vez no existe!`
      });
    }
    
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al actualizar el producto con id ${req.params.id}`
    });
  }
};

// Eliminar un producto
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    
    const productoEliminado = await Producto.findByIdAndRemove(id);
    
    if (!productoEliminado) {
      return res.status(404).json({
        mensaje: `No se pudo eliminar el producto con id ${id}. Tal vez no existe!`
      });
    }
    
    res.status(200).json({
      mensaje: 'Producto eliminado con éxito!'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al eliminar el producto con id ${req.params.id}`
    });
  }
}; 