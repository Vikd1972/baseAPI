/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import Rating from '../../db/entity/Rating';

import { booksRepo, usersRepo, ratingRepo } from '../../db';

type ParamsType = Record<string, never>;

type RequestType = {
  onRating: number;
  bookId: number;
};

type ResponseType = {
  myRating: Rating;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, unknown>;

const setRating: ControllerType = async (req, res, next) => {
  try {
    const { onRating, bookId } = req.body;

    const userId = req.user?.id;
    const book = await booksRepo.findOne({
      where: {
        id: bookId,
      },
    });

    const user = await usersRepo.findOne({
      where: {
        id: userId,
      },
    });

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

    if (!rating) {
      const newRating = new Rating();

      newRating.rating = onRating;
      if (user) newRating.user = user;
      if (book) newRating.book = book;

      await ratingRepo.save(newRating);
    } else {
      rating.rating = onRating;
      await ratingRepo.save(rating);
    }
    const ratingsOfBook = await ratingRepo.find({
      where: {
        book: {
          id: bookId,
        },
      },
    });
    // console.log(ratingsOfBook);
    const averageRatingBook = ratingsOfBook.reduce((sum, item) => sum + Number(item.rating), 0) /
      ratingsOfBook.length;

    const myRating = await ratingRepo.findOne({
      where: {
        user: {
          id: userId,
        },
        book: {
          id: bookId,
        },
      },
    });
    console.log(myRating);
    console.log(averageRatingBook);

    if (book) {
      // console.log(averageRatingBook, 'adsdasd');
      book.averageRating = averageRatingBook;
      await booksRepo.save(book);
    }

    const newBook = await booksRepo.findOne({
      where: {
        id: bookId,
      },
    });
    console.log(newBook);

    if (myRating) {
      return res.status(StatusCodes.OK).json({
        myRating,
      });
    }
  } catch (err) {
    next(err);
  }
};

export default setRating;
