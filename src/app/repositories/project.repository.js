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
   *    github_url: string | null;
   *    website_url: string | null;
   *    image_url: string | null;
   *    skills: Array<string>;
   *  }
   * ]
   */
  async getAllProjects() {
    const projects = await this.prisma.projects.findMany({
      include: {
        project_skills: {
          include: {
            skill: true,
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
   * @param {string} github_url - The GitHub URL of the project
   * @param {string} website_url - The website URL of the project
   * @param {string} image_url - The image URL of the project
   * @returns {Promise<Object>} - A promise that resolves to the created Prisma project object.
   */
  async createProject(name, description, skills, githubUrl = null, websiteUrl = null, imageUrl = null) {
    const skillCreateData = skills.map((skill) => {
      return {
        skill: {
          connectOrCreate: {
            where: { name: skill },
            create: { name: skill },
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
          create: skillCreateData,
        }
      },
      include: {
        project_skills: {
          include: { skill: true },
        }
      }
    });
  }

  /**
   * Map project to model
   * @param {Object} project - The project object
   * @returns {Object} The project model with the form:
   * {
   *  id: string;
   *  name: string;
   *  description: string;
   *  github_url: string | null;
   *  website_url: string | null;
   *  image_url: string | null;
   *  skills: Array<string>;
   * }
   */
  _mapProjectToModel(project) {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      github_url: project.github_url,
      website_url: project.website_url,
      image_url: project.image_url,
      skills: project.project_skills.map((projectSkill) => projectSkill.skill.name),
    };
  }
}
