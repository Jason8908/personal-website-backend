import { Router } from 'express';
import { loginUser } from '../controllers/users.controller.js';

import { loginUserValidation } from '../utils/validations/users/user.validations.js';
import { handleRequestValidations } from '../middleware/requestValidation.js';

const router = Router();

/**
 * @route POST /users/login
 * @desc  Login a user.
 * @body {string} email - The email of the user
 * @body {string} password - The password of the user
 */
router.post('/login', loginUserValidation, handleRequestValidations, loginUser);

export default router;
