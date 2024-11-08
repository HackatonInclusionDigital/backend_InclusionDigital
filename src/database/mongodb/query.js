const debug = require('debug')('app:database-mongodb');

const findDocumentById = async (Model, id) => {
    try {
        const document = await Model.findById(id);
        return document;
    } catch (error) {
        debug('Error en la consulta MongoDB:', error);
        throw new Error('Error al obtener el documento');
    }
};

const findDocuments = async (Model, query = {}, projection = {}) => {
    try {
        const documents = await Model.find(query, projection);
        return documents;
    } catch (error) {
        debug('Error en la consulta MongoDB:', error);
        throw new Error('Error al obtener los documentos');
    }
};

const createDocument = async (Model, data) => {
    try {
        const document = new Model(data);
        await document.save();
        return document;
    } catch (error) {
        debug('Error al crear el documento en MongoDB:', error);
        throw new Error('Error al crear el documento');
    }
};

module.exports.queryMongodb = {
    findDocumentById,
    findDocuments,
    createDocument
};
