import { Router } from 'express';

import authRouter from './userAuthRouter';
import postRouter from './postRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/post', postRouter);

export default router;
