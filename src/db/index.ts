import AppDataSource from './data-source';
import User from './entity/User';
import Book from './entity/Book';
import Genre from './entity/Genre';
import Cart from './entity/Cart';
import Comment from './entity/Comment';
import Rating from './entity/Rating';

export default {
  cart: AppDataSource.getRepository(Cart),
  users: AppDataSource.getRepository(User),
  books: AppDataSource.getRepository(Book),
  genre: AppDataSource.getRepository(Genre),
  comment: AppDataSource.getRepository(Comment),
  rating: AppDataSource.getRepository(Rating),
};
