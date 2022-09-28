import { Router } from 'express';

import userRouter from './userRouter';
import authRouter from './userAuthRouter';
import genereRouter from './genereRouter';
import bookRouter from './bookRouter';
import cartRouter from './cartRouter';
import ratinRouter from './ratinRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/genere', genereRouter);
router.use('/book', bookRouter);
router.use('/cart', cartRouter);
router.use('/rating', ratinRouter);

export default router;
