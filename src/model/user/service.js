const { queryMysql } = require('../../database/mysql/query');
const UserModel = require('./mongoUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Config } = require('../../config/index');
const debug = require('debug')('app:service-user');

const loginUser = async (email, password) => {
    try {
        // Consultar en MySQL para obtener el usuario por email
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        const [user] = await queryMysql.executeQuery(sql, [email]);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.contrasena);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }

        // Generar el token de autenticación
        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol },
            Config.jwtSecret, // Clave secreta definida en tu archivo de configuración
            { expiresIn: '1h' } // El token expirará en 1 hora
        );
        
        // Devolver el token y los datos del usuario (sin la contraseña)
        return { token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } };
    } catch (error) {
        debug('Error en el servicio de login:', error);
        throw new Error('Error al iniciar sesión');
    }
};

const registerUser = async (data) => {
    try {
        // Encriptar la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10); // Generar el salt
        const hashedPassword = await bcrypt.hash(data.contrasena, salt); // Encriptar la contraseña

        // 1. Registrar el usuario en MySQL
        const sql = 'INSERT INTO usuarios (nombre, email, contrasena, rol, documento, fecha_creacion) VALUES (?, ?, ?, ?, ?, NOW())';
        await queryMysql.executeQuery(sql, [data.nombre, data.email, hashedPassword, data.rol, data.documento]);

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
    loginUser,
    registerUser
};
