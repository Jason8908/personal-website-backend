import { Router } from 'express';
import { getEntireEducationHistory, createEducationHistory, updateEducationHistory } from '../controllers/education.controller.js';

import { createEducationHistoryValidation, updateEducationHistoryValidation } from '../utils/validations/education/education.validation.js';
import { handleRequestValidations } from '../middleware/requestValidation.js';

import { verifySession } from '../middleware/sessions.js';

const router = Router();

/**
 * @route GET /education
 * @desc  Get entire education history.
 */
router.get('/', getEntireEducationHistory);

/**
 * @route POST /education
 * @desc  Create a new education history.
 * @body {string} school - The school of the education history
 * @body {string} degree - The degree of the education history
 * @body {string} fieldOfStudy - The field of study of the education history
 * @body {string} description - The description of the education history
 * @body {Date} startDate - The start date of the education history
 * @body {Date} endDate - The end date of the education history
 */
router.post('/', verifySession, createEducationHistoryValidation, handleRequestValidations, createEducationHistory);

/**
 * @route PATCH /education/:id
 * @desc  Update a single field (or multiple) of an education history.
 */
router.patch('/:id', verifySession, updateEducationHistoryValidation, handleRequestValidations, updateEducationHistory);

export default router;
