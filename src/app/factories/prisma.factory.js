import { PrismaClient } from '../../../generated/prisma/index.js';
import { withAccelerate } from '@prisma/extension-accelerate';

const prismaClient = new PrismaClient().$extends(withAccelerate());

export const getPrismaClient = () => {
  return prismaClient;
};