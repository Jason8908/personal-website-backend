import './middleware/instrument.js';

import * as Sentry from "@sentry/node";

import express from 'express';

import healthRoutes from './routes/health.routes.js';
import usersRoutes from './routes/users.routes.js';
import educationRoutes from './routes/education.routes.js';

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

// Sentry error handler
Sentry.setupExpressErrorHandler(app);

// Error handler
app.use(errorHandler);

export default app;