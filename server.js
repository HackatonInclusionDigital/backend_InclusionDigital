const express = require('express');
const debug = require('debug')('app:main');
const http = require('http');
const cors = require('cors');

const { Config } = require('./src/config/index');
const createError = require('http-errors');
const { Response } = require('./src/common/response');

const app = express();

// Middlewares de seguridad
app.use(helmet());

// Habilitar CORS
app.use(cors());

// Parsear JSON
app.use(express.json());

// Importar rutas de la API


// Middlewares de manejo de errores
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Funciones de manejo de errores
function logErrors(err, req, res, next) {
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        Response.error(res, new createError[500]);
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    Response.error(res, new createError[500]);
}

// Iniciar el servidor
const server = http.createServer(app).listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`);
});