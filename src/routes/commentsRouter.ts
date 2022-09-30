import { Router } from 'express';

import isAuth from '../middlewares/authMiddleware';
import commentsController from '../controllers/commentsController/index';

const router = Router();

router.use(isAuth);

router.post('/', commentsController.addComment);
router.get('/', commentsController.getAllComments);

export default router;
