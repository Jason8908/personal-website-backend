import { Router } from 'express';
import { getHealthCheck } from '../controllers/health.controller.js';

const router = Router();

/**
 * @route GET /health
 * @desc  Health check endpoint
 */
router.get('/', getHealthCheck);

export default router;
