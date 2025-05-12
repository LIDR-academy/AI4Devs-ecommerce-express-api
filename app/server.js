const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Conexión a MongoDB
mongoose.connect(dbConfig.url)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Rutas
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Tienda Online' });
});

// Importar rutas
const productosRoutes = require('./routes/producto.routes');
const categoriasRoutes = require('./routes/categoria.routes');

// Usar rutas
app.use('/api/productos', productosRoutes);
app.use('/api/categorias', categoriasRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app; 