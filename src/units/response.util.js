const { logFailure } = require("../infra/logger");


/**
 * Sends a success response.
 * @param {Object} res - Express response object
 * @param {number} [statusCode=200] - HTTP status code (default is 200)
 * @param {*} [data=null] - Data to be sent in the response
 * @param {string} [message=''] - Optional message
 */
const handleSuccess = (res, statusCode = 200, data = null, message = '') => {
  res.status(statusCode).json({
    isSuccess: true,
    ...(message && { message }),
    data,
  });
};

/**
 * Sends an error response.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {number} [statusCode=500] - HTTP status code (default is 500)
 * @param {*} [errorDetails=null] - Optional additional error details
 * @param {string} [message='Internal Server Error'] - Error message
 */
const handleError = (req, res, statusCode = 500, errorDetails = null, message = 'Internal Server Error') => {
  logFailure('exception', message || 'Internal Server Error', {
    customProperties: {
      errorDetails,
      user: JSON.stringify(req.user),
      body: JSON.stringify(req.body),
      baseUrl: req.baseUrl,
    },
  });
  res.status(statusCode).json({
    isSuccess: false,
    ...(message && { message }),
    error: errorDetails,
  });
};

module.exports = {
  handleSuccess,
  handleError,
};
