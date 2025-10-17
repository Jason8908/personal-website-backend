import { getExperienceService } from '../factories/experience.factory.js';

const experienceService = getExperienceService();

/**
 * Get all experiences
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
export const getAllExperiences = async (req, res) => {
  const response = await experienceService.getAllExperiences();

  return res.status(response.statusCode).json(response.toJSON());
}

/**
 * Create a new experience
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
export const createExperience = async (req, res) => {
  const {
    company,
    position,
    bulletPoints,
    skills,
    startDate,
    endDate,
  } = req.body;

  const response = await experienceService.createExperience(company, position, bulletPoints, skills, startDate, endDate);

  return res.status(response.statusCode).json(response.toJSON());
}