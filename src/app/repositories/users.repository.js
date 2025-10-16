export class UsersRepository {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  /**
   * Create a new user
   * @param {string} email - The email of the user
   * @param {string} hash - The hash of the user's password
   */
  async createUser(email, hash) {
    await this.prisma.users.create({
      data: {
        email,
        password: hash,
      }
    });
  }

  /**
   * Get user by email
   * @param {string} email - The email of the user
   * @returns {Promise<Object>} The user object with the form:  
   * {
   *  id: string;
   *  email: string;
   *  hash: string;
   *  createdAt: Date;
   *  updatedAt: Date;
   * }
   */
  async getUserByEmail(email) {
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      }
    });

    return user ? this._mapUserToModel(user) : null;
  }

  /**
   * Get user by id
   * @param {string} id - The id of the user
   * @returns {Promise<Object>} The user object with the form:
   * {
   *  id: string;
   *  email: string;
   *  hash: string;
   *  createdAt: Date;
   *  updatedAt: Date;
   * }
   */
  async getUserById(id) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      }
    });

    return user ? this._mapUserToModel(user) : null;
  }

  /**
   * Map user to model
   * @param {Object} user - The user object
   * @returns {Object} The user model with the form:
   * {
   *  id: string;
   *  email: string;
   *  hash: string;
   *  createdAt: Date;
   *  updatedAt: Date;
   * }
   */
  _mapUserToModel(user) {
    return {
      id: user.id,
      email: user.email,
      hash: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
} 