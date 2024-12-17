const express = require('express');
const loginRouter = express.Router();
const loginController = require('../controllers/login.controllers');
const { verifyLogin } = require('../schema/login.schema');
const { handleSuccess, handleError } = require('../../units/response.util');
const validateRequest = require('../middlewares/validationHandler');

loginRouter.post(
    '/',
    validateRequest(verifyLogin, 'body'),
    (req, res) => {
        return loginController
            .verifyLogin(req.body)
            .then((results) => handleSuccess(res, results.statusCode, results.data))
            .catch((err) => handleError(req, res, err.statusCode, err, err?.message));
    },
);

module.exports = loginRouter