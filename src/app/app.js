import './middleware/instrument.js';

import * as Sentry from "@sentry/node";

import express from 'express';

import healthRoutes from './routes/health.routes.js';
import usersRoutes from './routes/users.routes.js';
import educationRoutes from './routes/education.routes.js';
import experienceRoutes from './routes/experience.routes.js';
import projectRoutes from './routes/project.routes.js';

import { errorHandler } from './middleware/errors.js';
import { sessionMiddleware } from './middleware/sessions.js';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(sessionMiddleware);


// Routes
app.use('/api/health', healthRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/projects', projectRoutes);

// Sentry error handler
Sentry.setupExpressErrorHandler(app);

// Error handler
app.use(errorHandler);

export default app;