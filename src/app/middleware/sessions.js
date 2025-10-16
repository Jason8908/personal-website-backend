const { ApiResponse } = await import('../utils/ApiResponse.js');

import { USER_SESSIONS_TABLE } from '../constants/sessions.js';

import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

import config from '../../config/index.js';

import { Pool } from 'pg';

// Session
const pgStore = connectPgSimple(session);

const pgPool = new Pool({
  connectionString: config.database.connectionString,
});

const pgSessionStore = new pgStore({
  pool: pgPool,
  tableName: USER_SESSIONS_TABLE,
  createTableIfMissing: config.session.createTableIfMissing,
});

/**
 * Session middleware
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Response} The response object
 */
export const sessionMiddleware = session({
  store: pgSessionStore,
  secret: config.session.secret,
  resave: config.session.resave,
  cookie: {
    maxAge: config.session.cookie.maxAge,
  },
  saveUninitialized: config.session.saveUninitialized,
  httpOnly: true,
  secure: config.server.isProduction,
});

/**
 * Verify session middleware
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Response} The response object
 */
export const verifySession = (req, res, next) => {
  if (!req.session?.userId) {
    return res.json(ApiResponse.unauthorized());
  }
  req.userId = req.session.userId;
  next();
}

