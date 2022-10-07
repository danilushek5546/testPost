import { Router } from 'express';

import validatitonMiddleware from '../middlewares/validateMiddleware';
import validationSchemas from '../validateSchemas/index';
import bookController from '../controllers/bookController/index';
import bookSchemas from '../validateSchemas/bookSchemas';

const router = Router();

router.post('/', validatitonMiddleware(bookSchemas.addBook), bookController.createBook);
router.get('/', validatitonMiddleware(validationSchemas.getAllSchema), bookController.getAllBooks);
router.get('/one/:id', validatitonMiddleware(validationSchemas.getOneSchema), bookController.getBookById);
router.get('/many', validatitonMiddleware(bookSchemas.getBooksById), bookController.getAllBooksById);

export default router;
