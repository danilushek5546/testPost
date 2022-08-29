import { Router } from 'express';
import userRouter from './userRouter';
import authRouter from './userAuthRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
