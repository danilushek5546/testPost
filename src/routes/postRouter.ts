import { Router } from 'express';

import isAuth from '../middlewares/authMiddleware';
import postController from '../controllers/postController';

const router = Router();

router.post('/', isAuth, postController.addPost);
router.get('/', postController.getPosts);
router.patch('/:postId', isAuth, postController.updatePost);
router.delete('/:postId', isAuth, postController.deleteOne);

export default router;
