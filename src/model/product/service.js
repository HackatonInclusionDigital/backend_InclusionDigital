const { queryMongodb } = require('../../database/mongodb/query');
const { queryMysql } = require('../../database/mysql/query');
const ProductModel = require('./mongoProduct');
const UserModel = require('../user/mongoUser');
const debug = require('debug')('app:service-product');

const getAllProducts = async () => {
    try {
        // Consulta en MySQL
        // const sql = 'SELECT * FROM productos';
        // const productsMySQL = await queryMysql.findAll(sql);

        // Consulta en MongoDB
        const productsMongoDB = await queryMongodb.findDocuments(ProductModel);

        return productsMongoDB;
    } catch (error) {
        debug('Error al obtener productos:', error);
        throw new Error('Error al obtener productos');
    }
};

const createProduct = async (data) => {
    try {
        // Verificar si el `id` del usuario se pasa en la solicitud
        if (!data.usuario_id) {
            throw new Error('El campo usuario_id es requerido');
        }

        // 1. Consultar en MySQL para verificar si el usuario existe y obtener su `documento`
        const sql = 'SELECT documento FROM usuarios WHERE id = ?';
        const [result] = await queryMysql.executeQuery(sql, [data.usuario_id]);
        
        if (!result) {
            throw new Error('El usuario con el ID proporcionado no existe en MySQL');
        }

        const { documento } = result; // Obtener el documento del usuario

        // 2. Buscar al usuario en MongoDB por su `documento`
        const user = await UserModel.findOne({ documento });
        if (!user) {
            throw new Error('El usuario con el documento proporcionado no existe en MongoDB');
        }

        // 3. Asignar el `_id` del usuario al `usuario_id` del producto
        data.usuario_id = user._id;

        // 4. Crear el producto en MongoDB
        const newProduct = new ProductModel(data);
        await newProduct.save();

        return { message: 'Producto creado exitosamente', product: newProduct };
    } catch (error) {
        debug('Error al crear producto:', error);
        throw new Error('Error al crear producto');
    }
};

module.exports.productService = {
    getAllProducts,
    createProduct
};
