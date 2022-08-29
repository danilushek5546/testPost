import { Router } from 'express';
import usercontrollers from '../controllers/usercontrollers/index';

const router = Router();

router.get('/', usercontrollers.getAllUsers);
router.get('/:id', usercontrollers.getOne);
router.delete('/:id', usercontrollers.deleteUser);
router.post('/', usercontrollers.postUser);
router.put('/:id', usercontrollers.putUser);

export default router;
