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

const getProductByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        // debug('ID del producto:', id);
        const product = await productService.getProductById(id);

        Response.success(res, 200, 'Producto encontrado', product);
    } catch (error) {
        Response.error(res, { statusCode: 404, message: error.message });
    }
};

const createProductHandler = async (req, res) => {
    try {
        const data = req.body;

        // Verificar si hay imágenes subidas
        if (req.files && req.files.length > 0) {
            data.imagenes = req.files.map(file => file.path); // Agregar las rutas de las imágenes al objeto `data`
        }

        await productService.createProduct(data);
        Response.success(res, 201, 'Producto creado en ambas bases de datos');
    } catch (error) {
        Response.error(res, { statusCode: 500, message: 'Error al crear producto' });
    }
};

module.exports.productController = {
    getProducts,
    getProductByIdHandler,
    createProductHandler
};
