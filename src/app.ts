import express from 'express';
import cors from 'cors';

import router from './routes';
import errorHandle from './middlewares/errorHandlerMiddleware';
import config from './config';

const app = express();

app.use(express.json());
app.use(cors());

console.log(config.static);

app.use(express.static(config.static));

app.use('/api', router);

app.use(errorHandle);

export default app;
