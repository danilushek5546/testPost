import dbDataSource from './dataSource';
import User from './entities/User';

export default {
  user: dbDataSource.getRepository(User),
};
