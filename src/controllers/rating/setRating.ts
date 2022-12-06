/* eslint-disable max-len */
/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import Rating from '../../db/entity/Rating';
import customError from '../../customError/customError';
import errorMessages from '../../utils/errorMessages';

import db from '../../db';

type ParamsType = Record<string, never>;

type RequestType = {
  onRating: number;
  bookId: number;
};

type ResponseType = {
  averageRatingBook: number;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, unknown>;

const setRating: ControllerType = async (req, res, next) => {
  try {
    const { onRating, bookId } = req.body;
    const userId = req.user?.id;

    const book = await db.books.findOne({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      throw customError(StatusCodes.UNAUTHORIZED, errorMessages.bookNotFound, errorMessages.bookNotFound);
    }

    const user = await db.users.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw customError(StatusCodes.UNAUTHORIZED, errorMessages.userNotFound, errorMessages.userNotFound);
    }

    const currentRating = await db.rating.findOne({
      where: {
        user: {
          id: userId,
        },
        book: {
          id: bookId,
        },
      },
    });

    if (currentRating) {
      currentRating.rating = onRating;
      await db.rating.save(currentRating);
    } else {
      const newRating = new Rating();

      newRating.rating = onRating;
      newRating.user = user;
      newRating.book = book;

      await db.rating.save(newRating);
    }

    const ratingsOfBook = await db.rating.find({
      where: {
        book: {
          id: bookId,
        },
      },
    });

    if (!ratingsOfBook) {
      return res.status(StatusCodes.OK).json({
        averageRatingBook: 0,
      });
    }
    const averageRatingBook = ratingsOfBook.reduce((sum, item) => sum + Number(item.rating), 0) /
      ratingsOfBook.length;

    book.averageRating = averageRatingBook;
    await db.books.save(book);

    return res.status(StatusCodes.OK).json({
      averageRatingBook,
    });
  } catch (err) {
    next(err);
  }
};

export default setRating;
