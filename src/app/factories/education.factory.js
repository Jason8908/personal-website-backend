import { EducationService } from "../services/education.service.js";
import { EducationRepository } from "../repositories/education.repository.js";
import { getPrismaClient } from "./prisma.factory.js";

/**
 * Get education service
 * @returns {EducationService}
 */
export const getEducationService = () => {
  const prismaClient = getPrismaClient();
  const educationRepository = new EducationRepository(prismaClient);
  return new EducationService(educationRepository);
};