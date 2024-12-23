const express = require('express');
const { userController } = require('./controller');

const router = express.Router();

module.exports.UserAPI = (app) => {
    router.post('/login', userController.loginHandler);
    router.post('/register', userController.registerUserHandler);
    app.use('/api/users', router);
};
