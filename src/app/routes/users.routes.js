import { Router } from 'express';
import { loginUser } from '../controllers/users.controller.js';

import { loginUserValidation } from '../utils/validations/users/user.validations.js';
import { handleRequestValidations } from '../middleware/requestValidation.js';

const router = Router();

/**
 * @route POST /users/login
 * @desc  Login a user.
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
router.post('/login', loginUserValidation, handleRequestValidations, loginUser);

export default router;
