import express from 'express';

import healthRoutes from './routes/health.routes.js';

import { errorHandler } from './middleware/errors.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/health', healthRoutes);

// Error handler
app.use(errorHandler);

export default app;