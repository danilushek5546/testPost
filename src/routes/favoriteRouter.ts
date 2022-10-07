import { Router } from 'express';

import isAuth from '../middlewares/authMiddleware';
import favoriteController from '../controllers/favoriteController/index';
import favoriteSchemas from '../validateSchemas/favoriteSchemas';
import validatitonMiddleware from '../middlewares/validateMiddleware';

const router = Router();

router.use(isAuth);

router.post('/:bookId', validatitonMiddleware(favoriteSchemas.addFavorite), favoriteController.addFavorite);
router.delete('/', validatitonMiddleware(favoriteSchemas.deleteFavorite), favoriteController.deleteFavorite);
router.get('/book/:userId', validatitonMiddleware(favoriteSchemas.getFavorite), favoriteController.getFavorite);

export default router;
