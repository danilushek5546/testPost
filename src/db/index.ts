import dbDataSource from './dataSource';
import Book from './entities/Book';
import Cart from './entities/Cart';
import Favorite from './entities/Favorite';
import Genere from './entities/Geners';
import Rating from './entities/Rating';
import User from './entities/User';

export default {
  user: dbDataSource.getRepository(User),
  genere: dbDataSource.getRepository(Genere),
  book: dbDataSource.getRepository(Book),
  cart: dbDataSource.getRepository(Cart),
  rating: dbDataSource.getRepository(Rating),
  favorite: dbDataSource.getRepository(Favorite),
};
