const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  imagenes: {
    type: [String],
    default: ['default.jpg']
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  destacado: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Esto automáticamente maneja createdAt y updatedAt
});

module.exports = mongoose.model('Producto', ProductoSchema); 