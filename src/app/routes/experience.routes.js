import { Router } from 'express';
import { getAllExperiences, createExperience } from '../controllers/experience.controller.js';

import { createExperienceValidation } from '../utils/validations/experiences/experience.validation.js';
import { handleRequestValidations } from '../middleware/requestValidation.js';

import { verifySession } from '../middleware/sessions.js';

const router = Router();

/**
 * @route GET /experiences
 * @desc  Get all experiences.
 */
router.get('/', getAllExperiences);

/**
 * @route POST /experiences
 * @desc  Create a new experience.
 * @body {string} company - The company of the experience
 * @body {string} position - The position of the experience
 * @body {Array<string>} bulletPoints - The bullet points of the experience
 * @body {Array<string>} skills - The skills of the experience
 * @body {Date} startDate - The start date of the experience
 * @body {Date} endDate - The end date of the experience
 */
router.post('/', verifySession, createExperienceValidation, handleRequestValidations, createExperience);

export default router;