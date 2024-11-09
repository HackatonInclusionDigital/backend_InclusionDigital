const express = require('express');
const { productController } = require('./controller');
const upload = require('../../config/multer');

const router = express.Router();

module.exports.ProductAPI = (app) => {
    router.get('/', productController.getProducts);
    router.get('/:id', productController.getProductByIdHandler);
    router.post('/', upload.array('imagenes', 5), productController.createProductHandler);

    app.use('/api/products', router);
};
