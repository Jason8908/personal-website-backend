import { ApiResponse } from '../utils/ApiResponse.js';

/**
 * Health service
 */
export class HealthService {
  constructor() { }

  /**
   * Get health check
   * @returns {Promise<ApiResponse>}
   */
  async getHealthCheck() {
    const healthData = {
      status: 'healthy',
      uptime: process.uptime(),
      message: 'Server is healthy'
    }

    return ApiResponse.success(healthData, 'Health check successful');
  }
}