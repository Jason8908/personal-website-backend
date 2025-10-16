import { validationResult } from 'express-validator';

import { ApiResponse } from '../utils/ApiResponse.js';

/**
 * Middleware to handle request validations
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Response} The response object
 */
export const handleRequestValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const uniqueErrors = removeDuplicateErrors(errors.array());
    return res.json(ApiResponse.badRequest({
      message: 'Validation error',
      errors: uniqueErrors.map(error => ({
        field: error.path,
        message: error.msg,
      })),
    }, ...[, ,]));
  }
  return next();
}

/**
 * Remove duplicate errors
 * @param {Array} errors - The array of errors
 * @returns {Array} The array of unique errors
 */
export const removeDuplicateErrors = (errors) => {
  const uniqueErrors = errors.filter((error, index, self) =>
    index === self.findIndex((t) => t.path === error.path && t.msg === error.msg)
  );
  return uniqueErrors;
}