import { Router } from 'express';

import isAuth from '../middlewares/authMiddleware';
import favoriteController from '../controllers/favoriteController/index';

const router = Router();

router.use(isAuth);

router.post('/:bookId', favoriteController.addFavorite);
router.delete('/', favoriteController.deleteFavorite);
router.get('/book/:userId', favoriteController.getFavorite);

export default router;
