import { ProjectService } from "../services/project.service.js";
import { ProjectRepository } from "../repositories/project.repository.js";
import { getPrismaClient } from "./prisma.factory.js";

/**
 * Get project service
 * @returns {ProjectService}
 */
export const getProjectService = () => {
  const prismaClient = getPrismaClient();
  const projectRepository = new ProjectRepository(prismaClient);
  return new ProjectService(projectRepository);
};