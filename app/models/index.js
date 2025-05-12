const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.categoria = require('./categoria.model');
db.producto = require('./producto.model');
db.usuario = require('./usuario.model');
db.pedido = require('./pedido.model');

module.exports = db; 