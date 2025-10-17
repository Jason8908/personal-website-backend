import { Router } from 'express';
import { getEntireEducationHistory, createEducationHistory } from '../controllers/education.controller.js';

import { createEducationHistoryValidation } from '../utils/validations/education/education.validation.js';
import { handleRequestValidations } from '../middleware/requestValidation.js';

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
router.post('/', createEducationHistoryValidation, handleRequestValidations, createEducationHistory);

export default router;
