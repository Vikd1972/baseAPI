import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
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

    const books = await db.books
      .createQueryBuilder()
      .where('id IN (:...ids)', { ids: randomBooks })
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

export default getRandomBooks;
