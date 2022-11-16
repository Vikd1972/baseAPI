/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type Comment from '../../db/entity/Comment';
import db from '../../db';

type ParamsType = Record<string, never>;

type RequestType = {
  bookId: number;
};

type QueryType = {
  bookId: string;
};

type ResponseType = {
  commentsOfBook: Comment[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, QueryType>;

const getComments: ControllerType = async (req, res, next) => {
  try {
    const { bookId } = req.query;

    const allCommentsOfBook = await db.comments.find({
      relations: {
        user: true,
      },
      where: {
        book: {
          id: Number(bookId),
        },
      },
    });

    if (!allCommentsOfBook) {
      return res.status(StatusCodes.OK);
    }

    const commentsOfBook = [...allCommentsOfBook];

    commentsOfBook.sort(
      (a, b) => (new Date(a.commentData).getTime()) - (new Date(b.commentData).getTime()),
    );

    return res.status(StatusCodes.OK).json({
      commentsOfBook,
    });
  } catch (err) {
    next(err);
  }
};

export default getComments;
