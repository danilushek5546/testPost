import { Router } from 'express';
import isAuth from '../middlewares/authMiddleware';
import authController from '../controllers/authController/index';

const router = Router();

router.post('/login', authController.signIn);
router.post('/registration', authController.signUp);
router.get('/auth', isAuth, authController.check);

export default router;
