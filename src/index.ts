import express from 'express';
import cors from 'cors';
import router from './routes/index';
import config from './config';
import dbDataSource from './db/db';
import errorHandle from './middlewares/errorHandleMiddleware';

const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandle);


const start = async () => {
  try {
    await dbDataSource.initialize();
    app.listen(port, () => console.log(`Running on port ${port}`));
  } catch (error) {
    
  }
}

const port = config.port || 5000;

app.use('/api', router);

start();