import { Router } from 'express';
import { loginUser, me } from '../controllers/users.controller.js';

import { loginUserValidation } from '../utils/validations/users/user.validations.js';
import { handleRequestValidations } from '../middleware/requestValidation.js';
import { verifySession } from '../middleware/sessions.js';

const router = Router();

/**
 * @route POST /users/login
 * @desc  Login a user.
 * @body {string} email - The email of the user
 * @body {string} password - The password of the user
 */
router.post('/login', loginUserValidation, handleRequestValidations, loginUser);

/**
 * @route GET /users/me
 * @desc  Get the currently logged in user's information.
 */
router.get('/me', verifySession, me);

export default router;
