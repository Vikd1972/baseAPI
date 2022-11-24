/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import config from '../../config';
import type Book from '../../db/entity/Book';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  favorites: number[];
};

type QueryType = {
  favorites: string;
};

type ResponseType = {
  books: Book[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, QueryType, BodyType>;

const getFavoritesBooks: ControllerType = async (req, res, next) => {
  try {
    const { favorites } = req.query;

    if (!favorites) {
      return res.status(StatusCodes.OK).send();
    }

    const favoritesBook = await db.books
      .createQueryBuilder()
      .where('id IN (:...ids)', { ids: favorites.split(',') })
      .getMany();

    const books = favoritesBook.map((book) => {
      return {
        ...book,
        hardcoverPrice: book.hardcoverPrice / 100,
        paperbackPrice: book.paperbackPrice / 100,
        pathToCover: `${config.pathToCover}${book.pathToCover}`,
      };
    });

    return res.status(StatusCodes.OK).json({
      books,
    });
  } catch (err) {
    next(err);
  }
};

export default getFavoritesBooks;
