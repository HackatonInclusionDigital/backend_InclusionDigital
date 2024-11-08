const { productService } = require('./service');
const { Response } = require('../../common/response');
const debug = require('debug')('app:controller-product');

const getProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        Response.success(res, 200, 'Productos obtenidos', products);
    } catch (error) {
        Response.error(res, { statusCode: 500, message: 'Error al obtener productos' });
    }
};

const createProductHandler = async (req, res) => {
    try {
        const data = req.body;
        await productService.createProduct(data);
        Response.success(res, 201, 'Producto creado en ambas bases de datos');
    } catch (error) {
        Response.error(res, { statusCode: 500, message: 'Error al crear producto' });
    }
};

module.exports.productController = {
    getProducts,
    createProductHandler
};
