import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

/**
 * Configuration utility class for managing environment variables
 * Provides type-safe access to configuration values with validation
 */
class Config {
  constructor() {
    this.validateRequiredEnvVars();
  }

  /**
   * Validates that all required environment variables are present
   * @throws {Error} If required environment variables are missing
   */
  validateRequiredEnvVars() {
    const requiredVars = [
      'NODE_ENV',
      'PORT',
      'SENTRY_DSN',
      'SENTRY_ENABLE_LOGS',
      'SENTRY_SEND_DEFAULT_PII',
      'DATABASE_URL',
      'POSTGRES_USER',
      'POSTGRES_PASSWORD',
      'POSTGRES_DB',
      'BCRYPT_SALT_ROUNDS',
      'INITIAL_USER_EMAIL',
      'INITIAL_USER_PASSWORD',
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
  }

  /**
   * Get environment variable with optional default value
   * @param {string} key - Environment variable key
   * @param {*} defaultValue - Default value if key is not found
   * @returns {*} Environment variable value or default
   */
  get(key, defaultValue = null) {
    return process.env[key] || defaultValue;
  }

  /**
   * Get environment variable as integer
   * @param {string} key - Environment variable key
   * @param {number} defaultValue - Default value if key is not found or invalid
   * @returns {number} Parsed integer value
   */
  getInt(key, defaultValue = 0) {
    const value = process.env[key];
    if (!value) return defaultValue;
    
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  /**
   * Get environment variable as boolean
   * @param {string} key - Environment variable key
   * @param {boolean} defaultValue - Default value if key is not found
   * @returns {boolean} Parsed boolean value
   */
  getBool(key, defaultValue = false) {
    const value = process.env[key];
    if (!value) return defaultValue;
    
    return value.toLowerCase() === 'true';
  }

  /**
   * Get environment variable as array (comma-separated)
   * @param {string} key - Environment variable key
   * @param {string[]} defaultValue - Default value if key is not found
   * @returns {string[]} Array of values
   */
  getArray(key, defaultValue = []) {
    const value = process.env[key];
    if (!value) return defaultValue;
    
    return value.split(',').map(item => item.trim()).filter(item => item.length > 0);
  }

  // Server Configuration
  get server() {
    return {
      nodeEnv: this.get('NODE_ENV', 'development'),
      port: this.getInt('PORT', 3000),
      host: this.get('HOST', 'localhost'),
      isDevelopment: this.get('NODE_ENV') === 'development',
      isProduction: this.get('NODE_ENV') === 'production',
      isTest: this.get('NODE_ENV') === 'test'
    };
  }

  // Sentry Configuration
  get sentry() {
    return {
      dsn: this.get('SENTRY_DSN'),
      enableLogs: this.getBool('SENTRY_ENABLE_LOGS', false),
      sendDefaultPii: this.getBool('SENTRY_SEND_DEFAULT_PII', false),
    }
  }

  // bcrypt configuration
  get bcrypt() {
    return {
      saltRounds: this.getInt('BCRYPT_SALT_ROUNDS', 10),
    }
  }

  // Initial user configuration
  get initialUser() {
    return {
      email: this.get('INITIAL_USER_EMAIL'),
      password: this.get('INITIAL_USER_PASSWORD'),
    }
  }

  /**
   * Get all configuration as a plain object
   * @returns {Object} All configuration values
   */
  getAll() {
    return {
      server: this.server,
      sentry: this.sentry,
      bcrypt: this.bcrypt,
      initialUser: this.initialUser,
    };
  }

  /**
   * Check if the application is running in a specific environment
   * @param {string} env - Environment to check ('development', 'production', 'test')
   * @returns {boolean} True if running in the specified environment
   */
  isEnvironment(env) {
    return this.server.nodeEnv === env;
  }
}

// Create and export a singleton instance
const config = new Config();
export default config;

// Also export individual configuration sections for convenience
export const {
  server,
  sentry,
  bcrypt,
  initialUser,
} = config;
