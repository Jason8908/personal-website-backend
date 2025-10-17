export class ExperienceRepository {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  /**
   * Create a new experience
   * @param {string} company - The company of the experience
   * @param {string} position - The position of the experience
   * @param {Array<string>} bulletPoints - The bullet points of the experience
   * @param {Array<string>} skills - The skills of the experience
   * @param {Date} startDate - The start date of the experience
   * @param {Date} endDate - The end date of the experience
   * @returns {Promise<Object>} The a promise that resolves to the created Prisma experience object.
   */
  async createExperience(company, position, bulletPoints, skills, startDate, endDate) {
    const bulletPointCreateData = bulletPoints.map(bulletPoint => {
      return {
        text: bulletPoint,
      }
    })

    const skillCreateData = skills.map(skill => {
      return {
        skill: {
          connectOrCreate: {
            where: {
              name: skill,
            },
            create: {
              name: skill,
            }
          }
        }
      }
    });
    
    return this.prisma.experiences.create({
      data: {
        company,
        position,
        start_date: startDate,
        end_date: endDate,
        bullet_points: {
          create: bulletPointCreateData
        },
        experiences_skills: {
          create: skillCreateData
        },
      },
      include: {
        bullet_points: true,
        experiences_skills: {
          include: {
            skill: true,
          }
        }
      }
    })
  }

  /**
   * Get all experiences
   * @returns {Promise<Array<Object>>} The array of experience objects with the form:
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
    const experiences = await this.prisma.experiences.findMany({
      include: {
        bullet_points: true,
        experiences_skills: {
          include: {
            skill: true,
          }
        }
      }
    });

    return experiences.map(this._mapExperienceToModel);
  }
  /**
   * Map experience to model
   * @param {Object} experience - The experience object
   * @returns {Object} The experience model with the form:
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
  _mapExperienceToModel(experience) {
    return {
      id: experience.id,
      company: experience.company,
      position: experience.position,
      bulletPoints: experience.bullet_points.map(bulletPoint => bulletPoint.text),
      skills: experience.experiences_skills.map(experienceSkill => experienceSkill.skill.name),
      startDate: experience.start_date,
      endDate: experience.end_date,
    }
  }
} 