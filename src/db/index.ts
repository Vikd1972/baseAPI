import AppDataSource from "./data-source";
import User from "./entity/User";
import Book from "./entity/Book";

export const usersRepo = AppDataSource.getRepository(User);

export const bookRepo = AppDataSource.getRepository(Book);

