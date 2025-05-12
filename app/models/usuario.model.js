const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellido: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Por favor ingresa un email válido']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  direccion: {
    calle: String,
    ciudad: String,
    estado: String,
    codigoPostal: String,
    pais: String
  },
  telefono: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['cliente', 'admin'],
    default: 'cliente'
  },
  activo: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model('Usuario', UsuarioSchema); 