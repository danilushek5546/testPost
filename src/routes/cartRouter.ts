import { Router } from 'express';

import isAuth from '../middlewares/authMiddleware';
import cartController from '../controllers/cartController/index';
import cartShemas from '../validateSchemas/cartShemas';

import validatitonMiddleware from '../middlewares/validateMiddleware';

const router = Router();

router.use(isAuth);

router.post('/addCart/:bookId', validatitonMiddleware(cartShemas.addCart), cartController.addToCart);
router.post('/updateCount', validatitonMiddleware(cartShemas.upadteCount), cartController.updateCount);
router.delete('/', validatitonMiddleware(cartShemas.deleteOneCart), cartController.deleteOne);
router.delete('/many/:userId', validatitonMiddleware(cartShemas.deleteManyCart), cartController.deleteMany);
router.get('/book/:userId', validatitonMiddleware(cartShemas.getCart), cartController.getCart);

export default router;
