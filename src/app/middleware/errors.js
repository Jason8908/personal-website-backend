import { ApiResponse } from '../utils/ApiResponse.js';
import config from '../../config/index.js';

/**
 * Error handler middleware
 * @param {Error} err - The error object
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Response} The response object
 */
export const errorHandler = (err, req, res, next) => {
  const isProduction = config.server.isProduction;

  const errorData = isProduction ? null : {
    message: err.message,
    stack: formatStackTrace(err.stack),
  };

  const response = ApiResponse.error(errorData);

  return res.status(response.statusCode).json(response.toJSON());
};

/**
 * Format stack trace into an array of strings. Each string is a line of the stack trace.
 * @param {string} stack - The entire stack trace string.
 * @returns {Array} The formatted stack trace as an array of strings.
 */
const formatStackTrace = (stack) => {
  return stack.split('\n').map(line => line.trim()).filter(line => line.length > 0);
};
