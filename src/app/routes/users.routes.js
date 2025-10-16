import { Router } from 'express';
import { loginUser } from '../controllers/users.controller.js';

const router = Router();

/**
 * @route POST /users/login
 * @desc  Login a user.
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
router.post('/login', loginUser);

export default router;
