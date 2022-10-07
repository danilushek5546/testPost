import { Router } from 'express';

import isAuth from '../middlewares/authMiddleware';
import commentsController from '../controllers/commentsController/index';
import commentsSchemas from '../validateSchemas/commentsSchemas';
import validatitonMiddleware from '../middlewares/validateMiddleware';

const router = Router();

router.post('/', isAuth, validatitonMiddleware(commentsSchemas.addComment), commentsController.addComment);
router.get('/', validatitonMiddleware(commentsSchemas.getComment), commentsController.getAllComments);

export default router;
