import { Router } from 'express';

import cartController from '../controllers/cartController/index';

const router = Router();

router.post('/', cartController.addToCart);
router.delete('/', cartController.deleteOne);
router.delete('/:userId', cartController.deleteMany);
router.get('/book/:userId', cartController.getCart);
router.get('/book', cartController.getAllCartBooks);

export default router;
