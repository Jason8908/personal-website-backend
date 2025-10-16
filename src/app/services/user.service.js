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
}