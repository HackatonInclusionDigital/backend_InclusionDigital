const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    documento: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    rol: {
        type: String,
        required: true,
        enum: ['vendedora', 'comprador'] // Puedes agregar más roles según tu caso
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('usuarios', userSchema);
module.exports = UserModel;
