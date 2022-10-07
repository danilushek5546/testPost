import { Router } from 'express';

import isAuth from '../middlewares/authMiddleware';
import addRating from '../controllers/ratingController/addRating';
import validatitonMiddleware from '../middlewares/validateMiddleware';
import { addRatingSchema } from '../validateSchemas/ratingSchemas';

const router = Router();

router.use(isAuth);

router.post('/', validatitonMiddleware(addRatingSchema), addRating);

export default router;
