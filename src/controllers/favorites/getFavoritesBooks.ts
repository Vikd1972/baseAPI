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

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, BodyType>;

const getFavoritesBooks: ControllerType = async (req, res, next) => {
  try {
    const favoritesBooks = req.body.favorites;

    const books = await booksRepo
      .createQueryBuilder()
      .where('id IN (:...ids)', { ids: favoritesBooks })
      .getMany();

    books.forEach((book) => {
      // eslint-disable-next-line no-param-reassign
      book.hardcoverPrice /= 100;
      // eslint-disable-next-line no-param-reassign
      book.paperbackPrice /= 100;
      // eslint-disable-next-line no-param-reassign
      book.pathToCover = `http://localhost:4001/covers/${book.pathToCover}`;
    });

    return res.status(StatusCodes.OK).json({
      books,
    });
  } catch (err) {
    next(err);
  }
};

export default getFavoritesBooks;
