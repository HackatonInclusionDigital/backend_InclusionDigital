const { exesql } = require('../database/mysql/query');
const UserModel = require('../model/user/mongoUser');
const debug = require('debug')('app:service-user');

const getUserById = async (id) => {
    try {
        // Consulta en MySQL
        const sql = 'SELECT * FROM usuarios WHERE id = ?';
        const [userMySQL] = await exesql(sql, [id]);
        
        // Consulta en MongoDB
        const userMongoDB = await UserModel.findById(id);

        return {
            userMySQL: userMySQL || null,
            userMongoDB: userMongoDB || null
        };
    } catch (error) {
        debug('Error en el servicio de usuario:', error);
        throw new Error('Error al obtener el usuario');
    }
};

const createUser = async (data) => {
    try {
        // Crear usuario en MySQL
        const sql = 'INSERT INTO usuarios (nombre, email, rol) VALUES (?, ?, ?)';
        await exesql(sql, [data.nombre, data.email, data.rol]);

        // Crear usuario en MongoDB
        const newUser = new UserModel(data);
        await newUser.save();

        return { message: 'Usuario creado en ambas bases de datos' };
    } catch (error) {
        debug('Error al crear el usuario:', error);
        throw new Error('Error al crear el usuario en las bases de datos');
    }
};

module.exports.userService = {
    getUserById,
    createUser
};
