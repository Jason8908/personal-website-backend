export class ProjectRepository {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  /**
   * Get all projects
   * @returns {Promise<Array<Object>>} The array of project objects with the form:
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
    const projects = await this.prisma.projects.findMany({
      include: {
        project_skills: {
          include: {
            skill: true
          }
        }
      }
    });

    return projects.map(this._mapProjectToModel);
  }

  /**
   * Create a new project
   * @param {string} name - The name of the project
   * @param {string} description - The description of the project
   * @param {Array<string>} skills - The skills of the project
   * @param {string} githubUrl - The GitHub URL of the project
   * @param {string} websiteUrl - The website URL of the project
   * @param {string} imageUrl - The image URL of the project
   * @returns {Promise<Object>} - A promise that resolves to the created Prisma project object.
   */
  async createProject(
    name,
    description,
    skills,
    githubUrl = null,
    websiteUrl = null,
    imageUrl = null
  ) {
    const skillCreateData = skills.map((skill) => {
      return {
        skill: {
          connectOrCreate: {
            where: { name: skill },
            create: { name: skill }
          }
        }
      };
    });

    return this.prisma.projects.create({
      data: {
        name,
        description,
        github_url: githubUrl,
        website_url: websiteUrl,
        image_url: imageUrl,
        project_skills: {
          create: skillCreateData
        }
      },
      include: {
        project_skills: {
          include: { skill: true }
        }
      }
    });
  }

  /**
   * Update a project by id
   * Replaces skills entirely when provided
   * @param {string} id - Project id
   * @param {Object} fields - Partial fields to update
   * @returns {Promise<Object|null>} Updated project model or null if not found
   */
  async updateProject(id, fields) {
    const existing = await this.prisma.projects.findUnique({
      where: { id },
      include: { project_skills: true }
    });
    if (!existing) return null;

    const updateData = {};
    if (fields.name !== undefined) updateData.name = fields.name;
    if (fields.description !== undefined)
      updateData.description = fields.description;
    if (fields.githubUrl !== undefined)
      updateData.github_url = fields.githubUrl;
    if (fields.websiteUrl !== undefined)
      updateData.website_url = fields.websiteUrl;
    if (fields.imageUrl !== undefined) updateData.image_url = fields.imageUrl;

    const doReplaceSkills = Array.isArray(fields.skills);

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

    const result = await this.prisma.projects.update({
      where: { id },
      data: {
        ...updateData,
        ...(doReplaceSkills
          ? {
              project_skills: {
                deleteMany: {},
                create: skillCreateData
              }
            }
          : {})
      },
      include: {
        project_skills: { include: { skill: true } }
      }
    });

    return this._mapProjectToModel(result);
  }

  /**
   * Gets a project by id
   * @param {string} id - The id of the project
   * @returns {Promise<Object>} The project object with the form:
   * {
   *  id: string;
   *  name: string;
   *  description: string;
   *  githubUrl: string | null;
   *  websiteUrl: string | null;
   *  imageUrl: string | null;
   *  skills: Array<string>;
   * }
   */
  async getProjectById(id) {
    const project = await this.prisma.projects.findUnique({
      where: { id },
      include: { project_skills: true }
    });

    return project ? this._mapProjectToModel(project) : null;
  }

  /**
   * Delete a project by id
   * @param {string} id - The id of the project
   * @returns {Promise<void>} A promise that resolves when the project is deleted
   */
  async deleteProject(id) {
    const project = await this.prisma.projects.findUnique({
      where: { id },
      include: { project_skills: true }
    });

    if (!project) return;

    await this.prisma.projects.delete({ where: { id } });
  }

  /**
   * Map project to model
   * @param {Object} project - The project object
   * @returns {Object} The project model with the form:
   * {
   *  id: string;
   *  name: string;
   *  description: string;
   *  githubUrl: string | null;
   *  websiteUrl: string | null;
   *  imageUrl: string | null;
   *  skills: Array<string>;
   * }
   */
  _mapProjectToModel(project) {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      githubUrl: project.github_url,
      websiteUrl: project.website_url,
      imageUrl: project.image_url,
      skills: project.project_skills.map((projectSkill) => projectSkill.skill.name)
    };
  }
}
