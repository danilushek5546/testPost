import app from './app';
import config from './config';
import dbDataSource from './db/dataSource';

(async () => {
  try {
    await dbDataSource.initialize();

    // eslint-disable-next-line no-console
    app.listen(config.serverPort, () => console.log(`Running on port ${config.serverPort}`));
  } catch (error) {
    throw new Error('Cannot connect to db');
  }
})();
