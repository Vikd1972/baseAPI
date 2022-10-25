import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo } from '../../db';
import type Book from '../../db/entity/Book';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type ResponseType = {
  books: Book[];
};

type ControllerType = RequestHandler<ParamsType, BodyType, RequestType, ResponseType>;

const getRandomBooks: ControllerType = async (req, res, next) => {
  try {
    const quantityBooks = await booksRepo.count();

    const randomBooks: number[] = [];
    for (let i = 0; i <= 3; i++) {
      randomBooks.push(Math.ceil(Math.random() * quantityBooks));
    }

    const books = await booksRepo
      .createQueryBuilder()
      .where('id IN (:...ids)', { ids: randomBooks })
      .getMany();

    books.forEach((book) => {
      book.hardcoverPrice /= 100;
      book.paperbackPrice /= 100;
    });

    return res.status(StatusCodes.OK).json({
      books,
    });
  } catch (err) {
    next(err);
  }
};

export default getRandomBooks;
