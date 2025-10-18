import { getUserService } from '../factories/user.factory.js';
import { HTTP_STATUS_CODES } from '../constants/http.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const userService = getUserService();

/**
 * Login a user by checking their credentials against the database.
 * Sets the session userId if the user is logged in successfully.
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const {response, userId} = await userService.loginUser(email, password);

  // If the user is logged in successfully, set the session userId
  if (response.statusCode === HTTP_STATUS_CODES.CREATED) {
    req.session.userId = userId;
  }

  return res.status(response.statusCode).json(response.toJSON());
}

/**
 * Get the user's information
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Response} The response object
 * as an object with the form:
 * {
 *  id: string;
 *  email: string;
 * }
 */
export const me = async (req, res) => {
  const { userId } = req.session;

  if (!userId) {
    return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json(ApiResponse.unauthorized().toJSON());
  }

  const response = await userService.me(userId);

  return res.status(response.statusCode).json(response.toJSON());
}