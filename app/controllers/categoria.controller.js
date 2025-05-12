const Categoria = require('../models/categoria.model');
const Producto = require('../models/producto.model');

// Crear una nueva categoría
exports.create = async (req, res) => {
  try {
    // Validar request
    if (!req.body.nombre) {
      return res.status(400).json({
        mensaje: 'El nombre de la categoría es obligatorio'
      });
    }

    // Crear una categoría
    const categoria = new Categoria({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      activa: req.body.activa !== undefined ? req.body.activa : true
    });

    // Guardar categoría en la base de datos
    const categoriaGuardada = await categoria.save();
    
    res.status(201).json(categoriaGuardada);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message || 'Error al crear la categoría'
    });
  }
};

// Obtener todas las categorías
exports.findAll = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({
      mensaje: error.message || 'Error al obtener las categorías'
    });
  }
};

// Obtener una categoría por id
exports.findOne = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    
    if (!categoria) {
      return res.status(404).json({
        mensaje: `No se encontró la categoría con id ${req.params.id}`
      });
    }
    
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al obtener la categoría con id ${req.params.id}`
    });
  }
};

// Actualizar una categoría
exports.update = async (req, res) => {
  try {
    // Validar request
    if (!req.body) {
      return res.status(400).json({
        mensaje: 'Los datos para actualizar no pueden estar vacíos'
      });
    }

    const id = req.params.id;
    
    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      id, 
      req.body,
      { new: true, useFindAndModify: false }
    );
    
    if (!categoriaActualizada) {
      return res.status(404).json({
        mensaje: `No se pudo actualizar la categoría con id ${id}. Tal vez no existe!`
      });
    }
    
    res.status(200).json(categoriaActualizada);
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al actualizar la categoría con id ${req.params.id}`
    });
  }
};

// Eliminar una categoría
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Verificar si hay productos asociados a esta categoría
    const productosAsociados = await Producto.countDocuments({ categoria: id });
    
    if (productosAsociados > 0) {
      return res.status(400).json({
        mensaje: `No se puede eliminar la categoría porque tiene ${productosAsociados} productos asociados`
      });
    }
    
    const categoriaEliminada = await Categoria.findByIdAndRemove(id);
    
    if (!categoriaEliminada) {
      return res.status(404).json({
        mensaje: `No se pudo eliminar la categoría con id ${id}. Tal vez no existe!`
      });
    }
    
    res.status(200).json({
      mensaje: 'Categoría eliminada con éxito!'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al eliminar la categoría con id ${req.params.id}`
    });
  }
};

// Obtener productos por categoría
exports.getProductosByCategoria = async (req, res) => {
  try {
    const id = req.params.id;
    
    const productos = await Producto.find({ categoria: id })
      .populate('categoria', 'nombre');
    
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      mensaje: `Error al obtener los productos de la categoría con id ${req.params.id}`
    });
  }
}; 