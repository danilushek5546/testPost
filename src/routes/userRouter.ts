import { Router } from 'express';
import usercontrollers from '../controllers/usercontrollers/index';
import validatitonMiddleware from '../middlewares/validateMiddleware';
import userSchema from '../validateSchemas/singInSchema';

const router = Router();

router.get('/', usercontrollers.getAllUsers);
router.get('/:id', usercontrollers.getOne);
router.delete('/:id', usercontrollers.deleteUser);
router.post('/', validatitonMiddleware(userSchema), usercontrollers.postUser);
router.put('/:id', validatitonMiddleware(userSchema), usercontrollers.putUser);

export default router;
