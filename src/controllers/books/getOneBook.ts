/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo, ratingRepo } from '../../db';
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
  myRating: number;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, BodyType>;

const getDetailBook: ControllerType = async (req, res, next) => {
  try {
    const bookId = req.body.id;
    const userId = req.user?.id;

    const book = await booksRepo.findOneBy({
      id: bookId,
    });

    if (!book) {
      throw customError(StatusCodes.NOT_FOUND, nameError.bookNotFound, bookId);
    }

    if (book) {
      book.hardcoverPrice /= 100;
      book.paperbackPrice /= 100;
      book.pathToCover = `http://localhost:4001/covers/${book.pathToCover}`;
    }

    const rating = await ratingRepo.findOne({
      where: {
        user: {
          id: userId,
        },
        book: {
          id: bookId,
        },
      },
    });
    const myRating = rating?.rating || 0;
    // console.log(myRating);

    return res.status(StatusCodes.OK).json({
      book,
      myRating,
    });
  } catch (err) {
    next(err);
  }
};

export default getDetailBook;
