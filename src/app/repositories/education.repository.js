export class EducationRepository {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  /**
   * Create a new education history
   * @param {string} school - The school of the education history
   * @param {string} degree - The degree of the education history
   * @param {string} fieldOfStudy - The field of study of the education history
   * @param {string} description - The description of the education history
   * @param {Date} startDate - The start date of the education history
   * @param {Date} endDate - The end date of the education history
   */
  async createEducationHistory(school, degree, fieldOfStudy, description, startDate, endDate) {
    return this.prisma.education_history.create({
      data: {
        school,
        degree,
        field_of_study: fieldOfStudy,
        description,
        start_date: startDate,
        end_date: endDate,
      }
    });
  }

  /**
   * Get entire education history
   * @returns {Promise<Array<Object>>} The array of education history objects with the form:
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
    const results = await this.prisma.education_history.findMany();

    return results.map(this._mapEducationHistoryToModel);
  }

  /**
   * Get education history by id
   * @param {string} id - The id of the education history
   * @returns {Promise<Object|null>} The education history model or null if not found
   */
  async getEducationHistoryById(id) {
    const result = await this.prisma.education_history.findUnique({
      where: { id },
    });

    return result ? this._mapEducationHistoryToModel(result) : null;
  }

  /**
   * Update education history by id
   * @param {string} id - The id of the education history
   * @param {Object} fields - Partial fields to update
   * @returns {Promise<Object|null>} The updated education history model or null if not found
   */
  async updateEducationHistory(id, fields) {
    const existing = await this.prisma.education_history.findUnique({ where: { id } });
    if (!existing) {
      return null;
    }

    const data = {};
    if (fields.school !== undefined) data.school = fields.school;
    if (fields.degree !== undefined) data.degree = fields.degree;
    if (fields.fieldOfStudy !== undefined) data.field_of_study = fields.fieldOfStudy;
    if (fields.description !== undefined) data.description = fields.description;
    if (fields.startDate !== undefined) data.start_date = fields.startDate;
    if (fields.endDate !== undefined) data.end_date = fields.endDate;

    const updated = await this.prisma.education_history.update({
      where: { id },
      data,
    });

    return this._mapEducationHistoryToModel(updated);
  }

  /**
   * Map education history to model
   * @param {Object} educationHistory - The education history object
   * @returns {Object} The education history model with the form:
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
  _mapEducationHistoryToModel(educationHistory) {
    return {
      id: educationHistory.id,
      school: educationHistory.school,
      degree: educationHistory.degree,
      fieldOfStudy: educationHistory.field_of_study,
      description: educationHistory.description,
      startDate: educationHistory.start_date,
      endDate: educationHistory.end_date,
    }
  }
} 