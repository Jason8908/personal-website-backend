import { body, query, param } from 'express-validator';

/**
 * Validation rules for the login user endpoint
 */
export const loginUserValidation = [
  body('email')
    .isEmail()
    .withMessage('Invalid email'),
  body('password')
    .isString()
    .withMessage('Password is required'),
];