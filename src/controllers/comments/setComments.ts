/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import Comment from '../../db/entity/Comment';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

import db from '../../db';

type ParamsType = Record<string, never>;

type RequestType = {
  comments: string;
  bookId: number;
};

type ResponseType = {
  commentsOfBook: Comment[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, unknown>;

const setComments: ControllerType = async (req, res, next) => {
  try {
    const { comments, bookId } = req.body;
    const userId = req.user?.id;

    const book = await db.books.findOne({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.bookNotFound, nameError.bookNotFound);
    }

    const user = await db.users.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.userNotFound, nameError.userNotFound);
    }

    const newComment = new Comment();

    newComment.comment = comments;
    newComment.commentData = new Date();
    newComment.user = user;
    newComment.book = book;

    await db.comments.save(newComment);

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

export default setComments;