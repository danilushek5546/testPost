import dbDataSource from './dataSource';
import Post from './entities/Post';
import User from './entities/User';

export default {
  user: dbDataSource.getRepository(User),
  post: dbDataSource.getRepository(Post),
};
