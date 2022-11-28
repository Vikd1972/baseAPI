import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import config from '../../config';
import type Book from '../../db/entity/Book';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type ResponseType = {
  books: Book[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, BodyType>;

const getRandomBooks: ControllerType = async (req, res, next) => {
  try {
    const quantityBooks = await db.books.count();

    const randomBooks: number[] = [];
    while (randomBooks.length < 4) {
      randomBooks.push(Math.ceil(Math.random() * quantityBooks));
    }

    const recommendetsBooks = await db.books
      .createQueryBuilder()
      .where('id IN (:...ids)', { ids: randomBooks })
      .getMany();

    const books = recommendetsBooks.map((book) => {
      return {
        ...book,
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

export default getRandomBooks;
