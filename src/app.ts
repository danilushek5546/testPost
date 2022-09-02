import express from 'express';
import cors from 'cors';

import router from './routes';
import errorHandle from './middlewares/errorHandlerMiddleware';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.use(errorHandle);

export default app;
