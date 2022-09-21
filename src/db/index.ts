import dbDataSource from './dataSource';
import Book from './entities/Book';
import Genere from './entities/Geners';
import User from './entities/User';

export default {
  user: dbDataSource.getRepository(User),
  genere: dbDataSource.getRepository(Genere),
  book: dbDataSource.getRepository(Book),
};
