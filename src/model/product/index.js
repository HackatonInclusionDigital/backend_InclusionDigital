const express = require('express');
const { productController } = require('./controller');

const router = express.Router();

module.exports.ProductAPI = (app) => {
    router.get('/', productController.getProducts);
    router.post('/', productController.createProductHandler);

    app.use('/api/products', router);
};
