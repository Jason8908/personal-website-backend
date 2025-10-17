import { ExperienceService } from "../services/experience.service.js";
import { ExperienceRepository } from "../repositories/experience.repository.js";
import { getPrismaClient } from "./prisma.factory.js";

/**
 * Get experience service
 * @returns {ExperienceService}
 */
export const getExperienceService = () => {
  const prismaClient = getPrismaClient();
  const experienceRepository = new ExperienceRepository(prismaClient);
  return new ExperienceService(experienceRepository);
};