/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import config from '../../config';
import Comment from '../../db/entity/Comment';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

import db from '../../db';

type ParamsType = Record<string, never>;

type RequestType = {
  comment: string;
  bookId: number;
};

type ResponseType = {
  commentsOfBook: Comment[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, unknown>;

const setComments: ControllerType = async (req, res, next) => {
  try {
    const { comment, bookId } = req.body;
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
      relations: {
        cart: true,
        comment: true,
        favorites: true,
        rating: true,
      },
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.userNotFound, nameError.userNotFound);
    }

    const newComment = new Comment();

    newComment.comment = comment;
    newComment.commentData = new Date();
    newComment.user = user;
    newComment.book = book;

    await db.comments.save(newComment);

    const allCommentsOfBook = await db.comments.find({
      relations: {
        user: true,
      },
      where: {
        book: {
          id: bookId,
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

    commentsOfBook.forEach((comment) => {
      return Object.entries(comment).map((item) => {
        if (item[0] === 'user') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-param-reassign
          item[1].photoFilePath = `${config.pathToImage}${comment.user.photoFilePath}`;
        }
        return item;
      });
    });

    return res.status(StatusCodes.OK).json({
      commentsOfBook,
    });
  } catch (err) {
    next(err);
  }
};

export default setComments;
