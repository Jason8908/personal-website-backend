import { HealthService } from '../services/health.service.js';

/**
 * Get health service
 * @returns {HealthService}
 */
export const getHealthService = () => {
  return new HealthService();
};