import express from 'express';
import cors from 'cors';
import router from './routes/index';
import config from './config';
import dbDataSource from './db/dataSource';
import errorHandle from './middlewares/errorHandlerMiddleware';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(errorHandle);

const port = config.port;

const start = async () => {
  try {
    await dbDataSource.initialize();
    // eslint-disable-next-line no-console
    app.listen(port, () => console.log(`Running on port ${port}`));
  } catch (error) {
    throw new Error('Cannot connect to db');
  }
};

start();
