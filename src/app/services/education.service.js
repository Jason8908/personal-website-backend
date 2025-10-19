import { ApiResponse } from '../utils/ApiResponse.js';
import config from '../../config/index.js';

/**
 * Education service
 */
export class EducationService {
  constructor(educationRepository) {
    this.educationRepository = educationRepository;
  }

  /**
   * Get entire education history
   * @returns {Promise<ApiResponse>} An APIResponse object with the education history data
   * as an array of objects with the form:
   * [
   *  {
   *    id: string;
   *    school: string;
   *    degree: string;
   *    fieldOfStudy: string;
   *    description: string;
   *    startDate: Date;
   *    endDate: Date;
   *  }
   * ]
   */
  async getEntireEducationHistory() {
    const educationHistory = await this.educationRepository.getEntireEducationHistory();

    return ApiResponse.success(educationHistory, 'Education history fetched successfully');
  }

  /**
   * Create a new education history
   * @param {string} school - The school of the education history
   * @param {string} degree - The degree of the education history
   * @param {string} fieldOfStudy - The field of study of the education history
   * @param {string} description - The description of the education history
   * @param {Date} startDate - The start date of the education history
   * @param {Date} endDate - The end date of the education history
   * @returns {Promise<ApiResponse>} An APIResponse object with the ID of the 
   * created education history.
   */
  async createEducationHistory(school, degree, fieldOfStudy, description, startDate, endDate) {
    const educationHistory = await this.educationRepository.createEducationHistory(school, degree, fieldOfStudy, description, startDate, endDate);

    return ApiResponse.created(educationHistory.id, 'Education history created successfully');
  }

  /**
   * Update education history by id
   * @param {string} id - The id of the education history
   * @param {Object} fields - Partial fields to update
   * @returns {Promise<ApiResponse>} ApiResponse with updated education history or not found
   */
  async updateEducationHistory(id, fields) {
    const updated = await this.educationRepository.updateEducationHistory(id, fields);

    if (!updated) {
      return ApiResponse.notFound(null, 'Education history not found');
    }

    return ApiResponse.success(updated, 'Education history updated successfully');
  }

  /**
   * Delete education history by id
   * @param {string} id - The id of the education history
   * @returns {Promise<ApiResponse>}
   */
  async deleteEducationHistory(id) {
    const educationHistory = await this.educationRepository.getEducationHistoryById(id);

    if (!educationHistory) {
      return ApiResponse.notFound(null, 'Education history not found');
    }

    await this.educationRepository.deleteEducationHistory(id);

    return ApiResponse.success(null, 'Education history deleted successfully');
  }

  /**
   * Get education history by id
   * @param {string} id - The id of the education history
   * @returns {Promise<ApiResponse>} ApiResponse with education history or not found
   * as an object with the form:
   * {
   *  id: string;
   *  school: string;
   *  degree: string;
   *  fieldOfStudy: string;
   *  description: string;
   *  startDate: Date;
   *  endDate: Date;
   * }
   */
  async getEducationHistoryById(id) {
    const educationHistory = await this.educationRepository.getEducationHistoryById(id);

    if (!educationHistory) {
      return ApiResponse.notFound(null, 'Education history not found');
    }

    return ApiResponse.success(educationHistory, 'Education history fetched successfully');
  }
}