import { Router } from 'express';
import {
  login, register, getCurrentUser, logout, refreshAccessToken,
} from '../controllers/auth';
import { validateRegisterBody } from '../middlewares/validatons';
import auth from '../middlewares/auth';

const router = Router();

router.post('/login', login);
router.post('/register', validateRegisterBody, register);
router.get('/token', refreshAccessToken);
router.get('/logout', logout);
router.get('/user', auth, getCurrentUser);

export default router;
