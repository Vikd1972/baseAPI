/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import Rating from '../../db/entity/Rating';
import type Cart from '../../db/entity/Cart';

import { booksRepo, usersRepo, ratingRepo } from '../../db';

type ParamsType = Record<string, never>;

type RequestType = {
  item: number;
  bookId: number;
};

type ResponseType = {
  userCart: Cart[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, unknown>;

const setRating: ControllerType = async (req, res, next) => {
  try {
    const { item, bookId } = req.body;
    console.log(req.body);
    const userId = req.user?.id;

    const rating = await ratingRepo.findOne({
      where: {
        book: {
          id: bookId,
        },
        user: {
          id: userId,
        },
      },
    });

    if (!rating) {
      const newRating = new Rating();

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

      newRating.rating = item;
      if (user) newRating.user = user;
      if (book) newRating.book = book;

      await ratingRepo.save(newRating);
    } else {
      rating.rating = item;
      await ratingRepo.save(rating);
    }

    const allRatingOfBook = await ratingRepo.find({
      where: {
        book: {
          id: bookId,
        },
      },
    });
    console.log(allRatingOfBook);

    const ratingBook = allRatingOfBook.reduce((sum, item) => sum + item.rating, 0) /
      allRatingOfBook.length;
    console.log(ratingBook);

    return res.status(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default setRating;
