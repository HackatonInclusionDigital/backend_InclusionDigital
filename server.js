const express = require('express');
const debug = require('debug')('app:main');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const { Config } = require('./src/config/index');
const createError = require('http-errors');
const { Response } = require('./src/common/response');

// require('./src/database/mysql/connection'); // Inicializa la conexión a MySQL
// require('./src/database/mongodb/connection'); // Inicializa la conexión a MongoDB

const app = express();

// Servir la carpeta 'uploads' de manera estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middlewares de seguridad
app.use(helmet());

// Habilitar CORS
app.use(cors({
    origin: '*', // Permitir solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parsear JSON
app.use(express.json());

// Importar rutas de la API
const { ProductAPI } = require('./src/model/product/index');
const { UserAPI } = require('./src/model/user/index');
ProductAPI(app);
UserAPI(app);

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
const server = http.createServer(app).listen(Config.port, '0.0.0.0', () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`);
});