import { Router } from 'express';
import userRouter from './userRouter';
import authRouter from './userAuthRouter';
import genereRouter from './genereRouter';
import bookRouter from './bookRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/genere', genereRouter);
router.use('/book', bookRouter);

export default router;
