/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type Rating from '../../db/entity/Rating';

import db from '../../db';

type ParamsType = Record<string, never>;

type RequestType = {
  bookId: number;
  userId: number;
};

type ResponseType = {
  myRating: Rating;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, unknown>;

const getRating: ControllerType = async (req, res, next) => {
  try {
    const { bookId, userId } = req.body;

    const myRating = await db.rating.findOne({
      where: {
        user: {
          id: userId,
        },
        book: {
          id: bookId,
        },
      },
    });

    if (!myRating) {
      return res.status(StatusCodes.OK);
    }

    return res.status(StatusCodes.OK).json({
      myRating,
    });
  } catch (err) {
    next(err);
  }
};

export default getRating;
