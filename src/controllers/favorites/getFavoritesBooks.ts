import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo } from '../../db';
import type Book from '../../db/entity/Book';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  favorites: number[];
};

type ResponseType = {
  books: Book[];
};

type ControllerType = RequestHandler<ParamsType, BodyType, RequestType, ResponseType>;

const getFavoritesBooks: ControllerType = async (req, res, next) => {
  try {
    const favoritesBooks = req.body.favorites;

    const books = await booksRepo
      .createQueryBuilder()
      .where('id IN (:...ids)', { ids: favoritesBooks })
      .getMany();

    books.forEach((book) => {
      Object.assign(0, { [book.hardcoverPrice]: book.hardcoverPrice / 100 });
      Object.assign(0, { [book.paperbackPrice]: book.paperbackPrice / 100 });
    });

    return res.status(StatusCodes.OK).format({
      books,
    });
  } catch (err) {
    next(err);
  }
};

export default getFavoritesBooks;
