import { Router } from "express";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/project.controller.js";

import {
  createProjectValidation,
  updateProjectValidation,
  deleteProjectValidation,
} from "../utils/validations/projects/project.validation.js";
import { handleRequestValidations } from "../middleware/requestValidation.js";

import { verifySession } from "../middleware/sessions.js";

const router = Router();

/**
 * @route GET /projects
 * @desc  Get all projects.
 */
router.get("/", getAllProjects);

/**
 * @route POST /projects
 * @desc  Create a new project.
 * @body {string} name - The name of the project
 * @body {string} description - The description of the project
 * @body {Array<string>} skills - The skills of the project
 * @body {string} githubUrl - The GitHub URL of the project
 * @body {string} websiteUrl - The website URL of the project
 * @body {string} imageUrl - The image URL of the project
 */
router.post(
  "/",
  verifySession,
  createProjectValidation,
  handleRequestValidations,
  createProject
);

/**
 * @route PATCH /projects/:id
 * @desc  Update a project.
 */
router.patch(
  "/:id",
  verifySession,
  updateProjectValidation,
  handleRequestValidations,
  updateProject
);

/**
 * @route DELETE /projects/:id
 * @desc  Delete a project.
 * @param {string} id - The id of the project
 */
router.delete(
  "/:id",
  verifySession,
  deleteProjectValidation,
  handleRequestValidations,
  deleteProject
);

export default router;
