const { handleError } = require('../../units/response.util');

/**
 * Generic validation middleware for Express.js.
 * @param {Object} schema - Joi schema for validation
 * @param {string} validateType - Type of validation: 'body', 'query', 'params', or 'all'
 * @returns {Function} Express middleware function
 */
function validateRequest(schema, validateType) {
  return (req, res, next) => {
    let data;
    if (validateType === 'all') {
      data = {
        ...req.body,
        ...req.query,
        ...req.params,
      };
    } else {
      data = req[validateType];
    }

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ');
      return handleError(req, res, 400, message, message);
    }

    next();
  };
}

module.exports = validateRequest;
