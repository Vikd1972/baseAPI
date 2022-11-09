/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type Comment from '../../db/entity/Comment';
import db from '../../db';

type ParamsType = Record<string, never>;

type RequestType = {
  bookId: number;
};

type ResponseType = {
  commentsOfBook: Comment[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, unknown>;

const getComments: ControllerType = async (req, res, next) => {
  try {
    const { bookId } = req.body;

    const commentsOfBook = await db.comments.find({
      relations: {
        user: true,
      },
      where: {
        book: {
          id: bookId,
        },
      },
    });
    if (!commentsOfBook) {
      return res.status(StatusCodes.OK);
    }

    return res.status(StatusCodes.OK).json({
      commentsOfBook,
    });
  } catch (err) {
    next(err);
  }
};

export default getComments;
