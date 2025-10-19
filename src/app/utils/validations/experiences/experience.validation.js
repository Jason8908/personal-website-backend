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

const ensureAtLeastOneUpdateField = (value) => {
  if (!value || typeof value !== 'object') return false;
  const allowed = ['company', 'position', 'bulletPoints', 'skills', 'startDate', 'endDate'];
  return allowed.some((k) => Object.prototype.hasOwnProperty.call(value, k));
}

export const updateExperienceValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid id'),
  body()
    .custom(ensureAtLeastOneUpdateField)
    .withMessage('At least one updatable field must be provided'),
  body('company')
    .optional()
    .isString()
    .withMessage('Company must be a string'),
  body('position')
    .optional()
    .isString()
    .withMessage('Position must be a string'),
  body('bulletPoints')
    .optional()
    .isArray()
    .withMessage('Bullet points must be an array'),
  body('bulletPoints.*')
    .optional()
    .isString()
    .withMessage('Bullet point must be a string'),
  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),
  body('skills.*')
    .optional()
    .isString()
    .withMessage('Skill must be a string'),
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

export const getExperienceByIdValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid id'),
];

export const deleteExperienceValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid id'),
];