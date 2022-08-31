import { Router } from 'express';
import usercontrollers from '../controllers/usercontrollers/index';
import validatitonMiddleware from '../middlewares/validateMiddleware';
import validationSchemas from '../validateSchemas/index';

const router = Router();

router.get('/', usercontrollers.getAllUsers);
router.get('/:id', validatitonMiddleware(validationSchemas.getOneSchema), usercontrollers.getOne);
router.delete('/:id', validatitonMiddleware(validationSchemas.getOneSchema), usercontrollers.deleteUser);
router.post('/', validatitonMiddleware(validationSchemas.signUpSchema), usercontrollers.createUser);
router.patch('/user/:id', validatitonMiddleware(validationSchemas.updateUserSchema), usercontrollers.updateUser);
router.patch('/password/:id', validatitonMiddleware(validationSchemas.updatePassSchema), usercontrollers.updatePassword);

export default router;
