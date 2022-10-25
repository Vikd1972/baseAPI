import AppDataSource from './data-source';
import User from './entity/User';
import Book from './entity/Book';
import Genre from './entity/Genre';
import Cart from './entity/Cart';
import Assessment from './entity/Assessment';

export const cartRepo = AppDataSource.getRepository(Cart);
export const usersRepo = AppDataSource.getRepository(User);
export const booksRepo = AppDataSource.getRepository(Book);
export const genreRepo = AppDataSource.getRepository(Genre);
export const assessmentRepo = AppDataSource.getRepository(Assessment);
