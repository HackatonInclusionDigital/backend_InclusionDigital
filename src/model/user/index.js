const express = require('express');
const { userController } = require('./controller');

const router = express.Router();

module.exports.UsersAPI = (app) => {
    router.get('/:id', userController.getUser);
    router.post('/', userController.createUserHandler);

    app.use('/api/users', router);
};
