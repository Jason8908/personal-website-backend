import { ApiResponse } from '../utils/ApiResponse.js';
import config from '../../config/index.js';

import bcrypt from 'bcrypt';

/**
 * User service
 */
export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;

    const { saltRounds } = config.bcrypt;

    this.saltRounds = saltRounds;
  }

  /**
   * Create a new user
   * @param {string} email - The email of the user
   * @param {string} password - The password of the user
   * @returns {Promise<ApiResponse>}
   */
  async createUser(email, password) {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(password, salt);

    await this.userRepository.createUser(email, hash);

    return ApiResponse.created(null, 'User created successfully');
  }

  /**
   * Login a user by checking their credentials against the database.
   * @param {string} email - The email of the user
   * @param {string} password - The password of the user
   * @returns {Promise<ApiResponse>}
   */
  async loginUser(email, password) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      return {
        response: ApiResponse.unauthorized(null, 'Invalid email or password'),
        userId: null,
      }
    }

    const isPasswordValid = await bcrypt.compare(password, user.hash);

    if (!isPasswordValid) {
      return {
        response: ApiResponse.unauthorized(null, 'Invalid email or password'),
        userId: null,
      }
    }

    return {
      response: ApiResponse.created(null, 'User logged in successfully'),
      userId: user.id,
    }
  }

  /**
   * Get the user's information
   * @param {string} userId - The id of the user
   * @returns {Promise<ApiResponse>} An APIResponse object with the user's information
   * as an object with the form:
   * {
   *  id: string;
   *  email: string;
   * }
   */
  async me(userId) {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      return ApiResponse.notFound(null, 'User not found');
    }

    const response = {
      id: user.id,
      email: user.email,
    }

    return ApiResponse.success(response);
  }
}