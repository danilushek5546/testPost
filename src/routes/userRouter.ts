import { Router } from 'express';

import usercontrollers from '../controllers/usercontrollers/index';
import validatitonMiddleware from '../middlewares/validateMiddleware';
import isAuth from '../middlewares/authMiddleware';
import validationSchemas from '../validateSchemas/index';

const router = Router();

router.use(isAuth);

router.get('/', validatitonMiddleware(validationSchemas.getAllSchema), usercontrollers.getAllUsers);
router.get('/:id', validatitonMiddleware(validationSchemas.getOneSchema), usercontrollers.getOneUser);
router.delete('/:id', validatitonMiddleware(validationSchemas.getOneSchema), usercontrollers.deleteUser);
router.post('/', validatitonMiddleware(validationSchemas.signUpSchema), usercontrollers.createUser);
router.patch('/change-password', validatitonMiddleware(validationSchemas.updatePassSchema), usercontrollers.updatePassword);
router.patch('/', validatitonMiddleware(validationSchemas.updateUserSchema), usercontrollers.updateUser);
router.patch('/photo', usercontrollers.uploadPhoto);

export default router;
