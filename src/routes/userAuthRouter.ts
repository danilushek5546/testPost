import { Router } from 'express';

import isAuth from '../middlewares/authMiddleware';
import authController from '../controllers/authController/index';
import validatitonMiddleware from '../middlewares/validateMiddleware';
import validationSchemas from '../validateSchemas/index';
import checkNotExpectedParams from '../middlewares/checkExpectedParams';

const router = Router();

router.post(
  '/login',
  checkNotExpectedParams(validationSchemas.singInSchema),
  validatitonMiddleware(validationSchemas.singInSchema),
  authController.signIn,
);
router.post('/registration', validatitonMiddleware(validationSchemas.signUpSchema), authController.signUp);
router.get('/', isAuth);

export default router;
