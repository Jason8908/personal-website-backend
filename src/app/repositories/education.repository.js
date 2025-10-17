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