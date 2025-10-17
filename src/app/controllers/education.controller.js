import { getEducationService } from '../factories/education.factory.js';

const educationService = getEducationService();

/**
 * Get entire education history
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
export const getEntireEducationHistory = async (req, res) => {
  const response = await educationService.getEntireEducationHistory();

  return res.status(response.statusCode).json(response.toJSON());
}

/**
 * Create a new education history
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
export const createEducationHistory = async (req, res) => {
  const { school, degree, fieldOfStudy, description, startDate, endDate } = req.body;

  const response = await educationService.createEducationHistory(school, degree, fieldOfStudy, description, startDate, endDate);

  return res.status(response.statusCode).json(response.toJSON());
}