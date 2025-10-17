import { body, query, param } from 'express-validator';

export const createExperienceValidation = [
  body('company')
    .isString()
    .withMessage('Company is required'),
  body('position')
    .isString()
    .withMessage('Position is required'),
  body('bulletPoints')
    .isArray()
    .withMessage('Bullet points must be an array'),
  body('skills')
    .isArray()
    .withMessage('Skills must be an array'),
  body('startDate')
    .isISO8601()
    .withMessage('Start date must be a date in ISO 8601 format')
    .custom((value) => value.endsWith('Z'))
    .withMessage('Start date must be in UTC timezone'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a date in ISO 8601 format')
    .custom((value) => value.endsWith('Z'))
    .withMessage('End date must be in UTC timezone'),
];