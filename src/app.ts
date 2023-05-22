import * as Minio from 'minio';
import express from 'express';
import cors from 'cors';

import router from './routes';
import errorHandle from './middlewares/errorHandlerMiddleware';
import config from './config';

export const minioClient = new Minio.Client({
  useSSL: false,
  endPoint: 'minio',
  port: 9000,
  accessKey: config.minio.accessKey,
  secretKey: config.minio.secretKey,
  pathStyle: true,
});

const app = express();

app.use(express.json({ limit: '25mb' }));
app.use(cors({}));

app.use('/api/testPost', router);

app.use(errorHandle);

export default app;
