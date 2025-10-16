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
} 