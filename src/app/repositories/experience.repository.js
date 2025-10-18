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
  async createExperience(
    company,
    position,
    bulletPoints,
    skills,
    startDate,
    endDate
  ) {
    const bulletPointCreateData = bulletPoints.map((bulletPoint) => {
      return {
        text: bulletPoint
      };
    });

    const skillCreateData = skills.map((skill) => {
      return {
        skill: {
          connectOrCreate: {
            where: {
              name: skill
            },
            create: {
              name: skill
            }
          }
        }
      };
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
        }
      },
      include: {
        bullet_points: true,
        experiences_skills: {
          include: {
            skill: true
          }
        }
      }
    });
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
            skill: true
          }
        }
      }
    });

    return experiences.map(this._mapExperienceToModel);
  }

  /**
   * Update an experience by id
   * Replaces bullet points and skills entirely when provided
   * @param {string} id - Experience id
   * @param {Object} fields - Partial fields to update
   * @returns {Promise<Object|null>} Updated experience model or null if not found
   */
  async updateExperience(id, fields) {
    const existing = await this.prisma.experiences.findUnique({
      where: { id },
      include: {
        bullet_points: true,
        experiences_skills: true
      }
    });
    if (!existing) return null;

    const updateData = {};
    if (fields.company !== undefined) updateData.company = fields.company;
    if (fields.position !== undefined) updateData.position = fields.position;
    if (fields.startDate !== undefined)
      updateData.start_date = fields.startDate;
    if (fields.endDate !== undefined) updateData.end_date = fields.endDate;

    // If the bullet points or skills are provided, replace the existing ones
    const doReplaceBulletPoints = Array.isArray(fields.bulletPoints);
    const doReplaceSkills = Array.isArray(fields.skills);

    // Create the bullet points data
    const bulletPointCreateData = doReplaceBulletPoints
      ? fields.bulletPoints.map((text) => ({ text }))
      : undefined;

    // Create the skills data
    const skillCreateData = doReplaceSkills
      ? fields.skills.map((skillName) => ({
          skill: {
            connectOrCreate: {
              where: { name: skillName },
              create: { name: skillName }
            }
          }
        }))
      : undefined;

    // Update the experience
    const result = await this.prisma.experiences.update({
      where: { id },
      data: {
        ...updateData,
        ...(doReplaceBulletPoints
          ? {
              bullet_points: {
                deleteMany: {},
                create: bulletPointCreateData
              }
            }
          : {}),
        ...(doReplaceSkills
          ? {
              experiences_skills: {
                deleteMany: {},
                create: skillCreateData,
              }
            }
          : {})
      },
      include: {
        bullet_points: true,
        experiences_skills: { include: { skill: true } }
      }
    });

    return this._mapExperienceToModel(result);
  }

  /**
   * Get an experience by id
   * @param {string} id - The id of the experience
   * @returns {Promise<Object|null>} The experience model or null if not found
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
   * or null if not found
   */
  async getExperienceById(id) {
    const experience = await this.prisma.experiences.findUnique({
      where: { id },
      include: {
        bullet_points: true,
        experiences_skills: { include: { skill: true } }
      }
    });

    return experience ? this._mapExperienceToModel(experience) : null;
  }

  /**
   * Delete an experience by id
   * @param {string} id - The id of the experience
   */
  async deleteExperience(id) {
    await this.prisma.experiences.delete({
      where: { id },
    });
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
      bulletPoints: experience.bullet_points.map(
        (bulletPoint) => bulletPoint.text
      ),
      skills: experience.experiences_skills.map(
        (experienceSkill) => experienceSkill.skill.name
      ),
      startDate: experience.start_date,
      endDate: experience.end_date
    };
  }
}
