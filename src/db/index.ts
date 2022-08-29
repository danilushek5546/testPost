import dbDataSource from './dataSource';
import User from './entities/models';

export default {
  user: dbDataSource.getRepository(User),
};
