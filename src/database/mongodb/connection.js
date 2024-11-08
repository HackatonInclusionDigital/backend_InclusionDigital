const mongoose = require('mongoose');
const { Config } = require('../../config/index');

mongoose.connect(Config.mongodb.uri)
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error de conexión a MongoDB:', err));

module.exports = mongoose;
