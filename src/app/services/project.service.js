import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * Project service
 */
export class ProjectService {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  /**
   * Get all projects
   * @returns {Promise<ApiResponse>} An APIResponse object with the projects data
   * as an array of objects with the form:
   * [
   *  {
   *    id: string;
   *    name: string;
   *    description: string;
   *    githubUrl: string | null;
   *    websiteUrl: string | null;
   *    imageUrl: string | null;
   *    skills: Array<string>;
   *  }
   * ]
   */
  async getAllProjects() {
    const projects = await this.projectRepository.getAllProjects();

    return ApiResponse.success(projects, "Projects fetched successfully");
  }

  /**
   * Create a new project
   * @param {string} name
   * @param {string} description - The description of the project
   * @param {Array<string>} skills - The skills of the project
   * @param {string} githubUrl - The GitHub URL of the project
   * @param {string} websiteUrl - The website URL of the project
   * @param {string} imageUrl - The image URL of the project
   * @returns {Promise<ApiResponse>} An APIResponse object with the ID of the created project.
   */
  async createProject(
    name,
    description,
    skills,
    githubUrl = null,
    websiteUrl = null,
    imageUrl = null
  ) {
    const project = await this.projectRepository.createProject(
      name,
      description,
      skills,
      githubUrl,
      websiteUrl,
      imageUrl
    );

    return ApiResponse.created(project.id, "Project created successfully");
  }

  /**
   * Update a project by id
   * @param {string} id - The id of the project
   * @param {Object} fields - Partial fields to update
   * @returns {Promise<ApiResponse>} ApiResponse with updated project or not found
   */
  async updateProject(id, fields) {
    const updated = await this.projectRepository.updateProject(id, fields);

    if (!updated) {
      return ApiResponse.notFound(null, "Project not found");
    }

    return ApiResponse.success(updated, "Project updated successfully");
  }

  /**
   * Delete a project by id
   * @param {string} id - The id of the project
   * @returns {Promise<ApiResponse>} ApiResponse with deleted project or not found
   * @returns {ApiResponse} ApiResponse with success message
   */
  async deleteProject(id) {
    const project = await this.projectRepository.getProjectById(id);

    if (!project) {
      return ApiResponse.notFound(null, "Project not found");
    }

    await this.projectRepository.deleteProject(id);

    return ApiResponse.success(null, "Project deleted successfully");
  }
}
