import dbDataSource from './dataSource';
import Genere from './entities/Geners';
import User from './entities/User';

export default {
  user: dbDataSource.getRepository(User),
  genere: dbDataSource.getRepository(Genere),
};
