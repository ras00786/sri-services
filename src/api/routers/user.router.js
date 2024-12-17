const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controllers');
const { registerSchema } = require('../schema/user.schema');
const { handleSuccess, handleError } = require('../../units/response.util');
const validateRequest = require('../middlewares/validationHandler');

userRouter.post(
    '/register',
    validateRequest(registerSchema, 'body'),
    (req, res) => {
        return userController
            .createUser(req.body)
            .then((results) => handleSuccess(res, results.statusCode, results.data))
            .catch((err) => handleError(req, res, err.statusCode, err, err?.message));
    },
);

module.exports = userRouter