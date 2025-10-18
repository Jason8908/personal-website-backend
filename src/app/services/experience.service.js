import { ApiResponse } from '../utils/ApiResponse.js';

/**
 * Experience service
 */
export class ExperienceService {
  constructor(experienceRepository) {
    this.experienceRepository = experienceRepository;
  }

  /**
   * Get all experiences
   * @returns {Promise<ApiResponse>} An APIResponse object with the experiences data
   * as an array of objects with the form:
   * [
   *  {
   *    id: string;
   *    company: string;
   *    position: string;
   *    bulletPoints: Array<string>;
   *    skills: Array<string>;
   *    startDate: Date;
   *    endDate: Date;
   *  }
   * ]
   */
  async getAllExperiences() {
    const experiences = await this.experienceRepository.getAllExperiences();

    return ApiResponse.success(experiences, 'Experiences fetched successfully');
  }

  /**
   * Get an experience by id
   * @param {string} id - The id of the experience
   * @returns {Promise<ApiResponse>} An ApiResponse object with the experience data
   * as an object with the form:
   * {
   *  id: string;
   *  company: string;
   *  position: string;
   *  bulletPoints: Array<string>;
   *  skills: Array<string>;
   *  startDate: Date;
   *  endDate: Date;
   * }
   */
  async getExperienceById(id) {
    const experience = await this.experienceRepository.getExperienceById(id);

    if (!experience) {
      return ApiResponse.notFound(null, 'Experience not found');
    }

    return ApiResponse.success(experience, 'Experience fetched successfully');
  }

  /**
   * Delete an experience by id
   * @param {string} id - The id of the experience
   */
  async deleteExperience(id) {
    const experience = await this.experienceRepository.getExperienceById(id);

    if (!experience) {
      return ApiResponse.notFound(null, 'Experience not found');
    }

    await this.experienceRepository.deleteExperience(id);

    return ApiResponse.success(null, 'Experience deleted successfully');
  }

  /**
   * Create a new experience
   * @param {string} company - The company of the experience
   * @param {string} position - The position of the experience
   * @param {Array<string>} bulletPoints - The bullet points of the experience
   * @param {Array<string>} skills - The skills of the experience
   * @param {Date} startDate - The start date of the experience
   * @param {Date} endDate - The end date of the experience
   * @returns {Promise<ApiResponse>} An ApiResponse object with the ID of the created experience.
   */
  async createExperience(company, position, bulletPoints, skills, startDate, endDate) {
    const experience = await this.experienceRepository.createExperience(company, position, bulletPoints, skills, startDate, endDate);

    return ApiResponse.created(experience.id, 'Experience created successfully');
  }

  /**
   * Update an experience by id
   * @param {string} id - The id of the experience
   * @param {Object} fields - Partial fields to update
   * @returns {Promise<ApiResponse>} ApiResponse with updated experience or not found
   */
  async updateExperience(id, fields) {
    const updated = await this.experienceRepository.updateExperience(id, fields);

    if (!updated) {
      return ApiResponse.notFound(null, 'Experience not found');
    }

    return ApiResponse.success(updated, 'Experience updated successfully');
  }
}