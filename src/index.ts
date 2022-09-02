import app from './app';
import config from './config';
import dbDataSource from './db/dataSource';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import types from './types/express/index';

(async () => {
  await dbDataSource.initialize();

  // eslint-disable-next-line no-console
  app.listen(config.serverPort, () => console.log(`Running on port ${config.serverPort}`));
})();
