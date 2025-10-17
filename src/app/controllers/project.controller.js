import { getProjectService } from '../factories/project.factory.js';

const projectService = getProjectService();

/**
 * Get all projects
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
export const getAllProjects = async (req, res) => {
  const response = await projectService.getAllProjects();

  return res.status(response.statusCode).json(response.toJSON());
};

/**
 * Create a new project
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
export const createProject = async (req, res) => {
  const {
    name,
    description,
    skills,
    githubUrl,
    websiteUrl,
    imageUrl,
  } = req.body;

  const response = await projectService.createProject(name, description, skills, githubUrl, websiteUrl, imageUrl);

  return res.status(response.statusCode).json(response.toJSON());
};