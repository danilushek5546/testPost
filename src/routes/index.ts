import { Router } from 'express';
import userRouter from './userRouter';
import authRouter from './userAuthRouter';
import genereRouter from './genereRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/genere', genereRouter);

export default router;
