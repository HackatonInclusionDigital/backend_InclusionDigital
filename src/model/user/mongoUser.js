const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['emprendedora', 'compradora'], // Puedes ajustar los roles según tu aplicación
        required: true
    },
    documento: {
        type: String, // Representa el DNI u otro identificador único del usuario
        required: true,
        unique: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('usuarios', userSchema);
module.exports = UserModel;
