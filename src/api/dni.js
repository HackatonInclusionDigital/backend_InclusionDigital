const axios = require('axios');
const debug = require('debug')('app:verification-service');
const { Config } = require('../config/index');

const verifyUserDocument = async (documento) => {
    try {
        // URL de la API externa para la verificación del DNI (ajusta la URL según tu caso)
        const response = await axios.get(`https://api.perudevs.com/api/v1/dni/complete?document=${documento}&key=${Config.tokendni}`);

        // Verificar si la respuesta contiene los datos esperados
        if (response.data) {
            return response.data;
        } else {
            throw new Error('No se encontraron datos para el documento proporcionado');
        }
    } catch (error) {
        debug('Error al verificar el documento en la API externa:', error);
        throw new Error('Error al verificar el documento en la API externa');
    }
};

module.exports = {
    verifyUserDocument
};
