/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import config from '../../config';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';
import type Book from '../../db/entity/Book';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  bookId: number;
};

type QueryType = {
  bookId: string;
};

type ResponseType = {
  book: Book;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, QueryType, BodyType>;

const getDetailBook: ControllerType = async (req, res, next) => {
  try {
    const { bookId } = req.query;

    const book = await db.books.findOneBy({
      id: Number(bookId),
    });

    if (!book) {
      throw customError(StatusCodes.NOT_FOUND, nameError.bookNotFound, bookId);
    }

    book.pathToCover = `${config.pathToCover}${book.pathToCover}`;

    return res.status(StatusCodes.OK).json({
      book,
    });
  } catch (err) {
    next(err);
  }
};

export default getDetailBook;
