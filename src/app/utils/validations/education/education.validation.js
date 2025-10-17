import { body, query, param } from 'express-validator';

const ensureAtLeastOneUpdateField = (value) => {
  if (!value || typeof value !== 'object') return false;
  const allowed = ['school', 'degree', 'fieldOfStudy', 'description', 'startDate', 'endDate'];
  return allowed.some((k) => Object.prototype.hasOwnProperty.call(value, k));
}

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

/**
 * Validation rules for the update education history endpoint
 */
export const updateEducationHistoryValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid id'),
  body()
    .custom(ensureAtLeastOneUpdateField)
    .withMessage('At least one updatable field must be provided'),
  body('school')
    .optional()
    .isString()
    .withMessage('School must be a string'),
  body('degree')
    .optional()
    .isString()
    .withMessage('Degree must be a string'),
  body('fieldOfStudy')
    .optional()
    .isString()
    .withMessage('Field of study must be a string'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('startDate')
    .optional()
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