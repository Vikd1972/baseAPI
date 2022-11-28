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

type QueryType = {
  bookId: string;
};

type ResponseType = {
  myRating: {
    id: number;
    rating: number;
  };
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, QueryType>;

const getRating: ControllerType = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { bookId } = req.query;

    const myRating = await db.rating.findOne({
      where: {
        user: {
          id: userId,
        },
        book: {
          id: Number(bookId),
        },
      },
    });

    if (!myRating) {
      return res.sendStatus(StatusCodes.OK);
    }

    return res.status(StatusCodes.OK).json({
      myRating,
    });
  } catch (err) {
    next(err);
  }
};

export default getRating;
