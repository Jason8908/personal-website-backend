import { getUserService } from '../factories/user.factory.js';
import { HTTP_STATUS_CODES } from '../constants/http.js';

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