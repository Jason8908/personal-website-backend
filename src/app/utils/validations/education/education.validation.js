import { body, query, param } from 'express-validator';

/**
 * Validation rules for the create education history endpoint
 */
export const createEducationHistoryValidation = [
  body('school')
    .isString()
    .withMessage('School is required'),
  body('degree')
    .isString()
    .withMessage('Degree is required'),
  body('fieldOfStudy')
    .isString()
    .withMessage('Field of study is required'),
  body('description')
    .isString()
    .withMessage('Description is required'),
  body('startDate')
    .isISO8601()
    .withMessage('Start date must be a date in ISO 8601 format')
    .custom((value) => {
      return value.endsWith('Z');
    })
    .withMessage('Start date must be in UTC timezone'),
  body('endDate')
    .isISO8601()
    .withMessage('End date must be a date in ISO 8601 format')
    .custom((value) => {
      return value.endsWith('Z');
    })
    .withMessage('End date must be in UTC timezone'),
];