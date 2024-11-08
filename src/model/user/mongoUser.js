const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    rol: {
        type: String,
        enum: ['emprendedora', 'compradora'],
        required: true
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
