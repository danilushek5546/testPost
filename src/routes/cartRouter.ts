import { Router } from 'express';

import isAuth from '../middlewares/authMiddleware';
import cartController from '../controllers/cartController/index';

const router = Router();

router.use(isAuth);

router.post('/:bookId', cartController.addToCart);
router.delete('/', cartController.deleteOne);
router.delete('/many/:userId', cartController.deleteMany);
router.get('/book/:userId', cartController.getCart);
router.get('/book', cartController.getAllCartBooks);

export default router;
