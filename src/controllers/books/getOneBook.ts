import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo } from '../../db';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';
import type Book from '../../db/entity/Book';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  id: number;
};

type ResponseType = {
  book: Book;
};

type ControllerType = RequestHandler<ParamsType, BodyType, RequestType, ResponseType>;

const getDetailBook: ControllerType = async (req, res, next) => {
  try {
    const id = req.body.id;

    const book = await booksRepo.findOneBy({
      id,
    });

    if (!book) {
      throw customError(StatusCodes.NOT_FOUND, nameError.bookNotFound, id);
    }

    if (book) {
      book.hardcoverPrice /= 100;
      book.paperbackPrice /= 100;
    }

    return res.status(StatusCodes.OK).format({
      book,
    });
  } catch (err) {
    next(err);
  }
};

export default getDetailBook;
