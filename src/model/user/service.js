const { queryMysql } = require('../../database/mysql/query');
const UserModel = require('./mongoUser');
const debug = require('debug')('app:service-user');

const registerUser = async (data) => {
    try {
        // 1. Registrar el usuario en MySQL
        const sql = 'INSERT INTO usuarios (nombre, email, contrasena, rol, documento, fecha_creacion) VALUES (?, ?, ?, ?, ?, NOW())';
        await queryMysql.executeQuery(sql, [data.nombre, data.email, data.contrasena, data.rol, data.documento]);

        // 2. Registrar el usuario en MongoDB
        const newUser = new UserModel({
            documento: data.documento,
            nombre: data.nombre,
            email: data.email,
            rol: data.rol
        });
        await newUser.save();

        return { message: 'Usuario registrado exitosamente', user: newUser };
    } catch (error) {
        debug('Error al registrar usuario:', error);
        throw new Error('Error al registrar usuario');
    }
};

module.exports.userService = {
    registerUser
};
