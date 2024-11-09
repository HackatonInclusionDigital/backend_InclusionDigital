const { userService } = require('./service');
const { verifyUserDocument } = require('../../api/dni');
const { Response } = require('../../common/response');
const debug = require('debug')('app:controller-user');
const moment = require('moment');

const registerUserHandler = async (req, res) => {
    try {
        const data = req.body;
        debug('Datos de registro:', data);

        if (!data.documento) {
            throw new Error('El campo documento es requerido');
        }

        // 1. Llamar a la función de verificación de documento
        const userData = await verifyUserDocument(data.documento);

        if (!userData || !userData.estado) {
            throw new Error('El documento proporcionado no es válido');
        }

        // 2. Verificar si el usuario es mayor de edad usando Moment.js
        const edad = moment().diff(moment(userData.resultado.fecha_nacimiento, 'DD/MM/YYYY'), 'years');
        if (edad < 18) {
            throw new Error('El usuario debe ser mayor de edad para registrarse');
        }

        // 3. Validar que si el rol es "vendedora", el género debe ser femenino
        if (data.rol === 'vendedora' && userData.resultado.genero !== 'F') {
            throw new Error('Solo las usuarias de género femenino pueden registrarse como vendedoras');
        }

        // 4. Permitir el registro si es un comprador o si cumple las condiciones para vendedora
        const result = await userService.registerUser(data);
        Response.success(res, 201, result.message, result.user);
    } catch (error) {
        debug('Error al registrar usuario:', error);
        Response.error(res, { statusCode: 400, message: error.message });
    }
};
module.exports.userController = {
    registerUserHandler
};
