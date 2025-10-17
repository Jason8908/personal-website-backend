import { body, query, param } from 'express-validator';

export const createProjectValidation = [
  body('name')
    .isString()
    .withMessage('Name is required'),
  body('description')
    .isString()
    .withMessage('Description is required'),
  body('skills')
    .isArray()
    .withMessage('Skills must be an array'),
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be a valid URL'),
  body('websiteUrl')
    .optional()
    .isURL()
    .withMessage('Website URL must be a valid URL'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
];