import { getHealthService } from '../factories/health.factory.js';

const healthService = getHealthService();

export const getHealthCheck = async (req, res) => {
  const response = await healthService.getHealthCheck();

  return res.status(response.statusCode).json(response.toJSON());
};