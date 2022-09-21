import { Router } from 'express';

import bookController from '../controllers/bookController/index';

const router = Router();

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);

export default router;
