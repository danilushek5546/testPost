import { Router } from 'express';

import genereController from '../controllers/generesController/index';

const router = Router();

router.post('/', genereController.addGenere);
router.get('/', genereController.getGeners);

export default router;
