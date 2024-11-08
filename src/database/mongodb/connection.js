const mongoose = require('mongoose');
const { Config } = require('../../config');

mongoose.connect(Config.mongodb.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error de conexión a MongoDB:', err));

module.exports = mongoose;
