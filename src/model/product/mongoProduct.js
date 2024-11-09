const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        default: ''
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    categoria: {
        type: String,
        default: ''
    },
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    imagenes: {
        type: [String], // Array de strings para almacenar rutas o URLs de imágenes
        default: [],
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    fecha_actualizacion: {
        type: Date,
        default: Date.now
    }
});

const ProductModel = mongoose.model('productos', productSchema);
module.exports = ProductModel;
