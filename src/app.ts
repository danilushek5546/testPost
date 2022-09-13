import express from 'express';
import cors from 'cors';

import router from './routes';
import errorHandle from './middlewares/errorHandlerMiddleware';
import config from './config';

const app = express();

app.use(express.json({ limit: '25mb' }));
app.use(cors({}));

app.use(express.static(`${__dirname}/static`));

app.use('/api', router);

app.use(errorHandle);

export default app;
