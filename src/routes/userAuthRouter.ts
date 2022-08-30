import { Router } from 'express';
import isAuth from '../middlewares/authMiddleware';
import authController from '../controllers/authController/index';
import validatitonMiddleware from '../middlewares/validateMiddleware';
import userSchema from '../validateSchemas/singInSchema';

const router = Router();

router.post('/login', validatitonMiddleware(userSchema), authController.signIn);
router.post('/registration', validatitonMiddleware(userSchema), authController.signUp);
router.get('/auth', isAuth);

export default router;
