const { ServerError } = require('./baseError');

const defaultMessage =
  'The server encountered an unexpected condition which prevented it from fulfilling the request.';

class InternalServerError extends ServerError {
  constructor(message = defaultMessage, options = {}) {
    super(message);
    this.code = 500;
    this.id = 'ErrorInternalServerError';
    this.description = message;

    // Attach relevant information to the error instance
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  get statusCode() {
    return this.code;
  }
}

module.exports = {
  InternalServerError,
};
