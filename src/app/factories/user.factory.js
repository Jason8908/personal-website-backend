import { UserService } from '../services/user.service.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { getPrismaClient } from './prisma.factory.js';
/**
 * Get user service
 * @returns {UserService}
 */
export const getUserService = () => {
  const prismaClient = getPrismaClient();
  const usersRepository = new UsersRepository(prismaClient);
  
  return new UserService(usersRepository);
};