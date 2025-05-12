const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemPedidoSchema = new Schema({
  producto: {
    type: Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1
  },
  precio: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  }
});

const PedidoSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  productos: [ItemPedidoSchema],
  total: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'enviado', 'entregado', 'cancelado'],
    default: 'pendiente'
  },
  direccionEnvio: {
    type: String,
    required: true
  },
  fechaCompra: {
    type: Date,
    default: Date.now
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

// Middleware para actualizar fechaActualizacion
PedidoSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Pedido', PedidoSchema); 