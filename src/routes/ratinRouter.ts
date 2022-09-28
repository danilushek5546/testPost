import { Router } from 'express';

import isAuth from '../middlewares/authMiddleware';
import addRating from '../controllers/ratingController/addRating';

const router = Router();

router.use(isAuth);

router.post('/', addRating);

export default router;
