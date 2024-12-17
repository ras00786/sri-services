import  { logFailure } from './../../infra/logger';

/**
 * Middleware to log all HTTP requests (successful and failed)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const requestLoggingMiddleware = (req, res, next) => {
  const start = Date.now();

  // Add a listener for the 'finish' event on the response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const isSuccess = res.statusCode < 400 || res.statusCode === 304;

    // Log the request as success or failure based on the status code
    const logMessage = isSuccess
      ? `Request succeeded with status ${res.statusCode}`
      : `Request failed with status ${res.statusCode}`;

    logFailure('request', logMessage, {
      url: req.originalUrl,
      method: req.method,
      statusCode: res.statusCode,
      duration,
    });
  });

  // Proceed to the next middleware
  next();
};

