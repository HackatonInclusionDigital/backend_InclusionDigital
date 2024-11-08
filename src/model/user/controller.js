const { userService } = require('./service');
const { Response } = require('../common/response');

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);

        if (!user.userMySQL && !user.userMongoDB) {
            return Response.error(res, { statusCode: 404, message: 'Usuario no encontrado' });
        }

        Response.success(res, 200, 'Usuario obtenido', user);
    } catch (error) {
        Response.error(res, { statusCode: 500, message: 'Error al obtener el usuario' });
    }
};

const createUserHandler = async (req, res) => {
    try {
        const data = req.body;
        const result = await userService.createUser(data);
        Response.success(res, 201, result.message);
    } catch (error) {
        Response.error(res, { statusCode: 500, message: 'Error al crear el usuario' });
    }
};

module.exports.userController = {
    getUser,
    createUserHandler
};
