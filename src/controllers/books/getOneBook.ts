/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import config from '../../config';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';
import type Book from '../../db/entity/Book';
import type Comment from '../../db/entity/Comment';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  bookId: number;
};

type QueryType = {
  bookId: string;
  userId: string;
};

type ResponseType = {
  book: Book;
  commentsOfBook: Comment[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, QueryType, BodyType>;

const getDetailBook: ControllerType = async (req, res, next) => {
  try {
    const { bookId, userId } = req.query;
    // const userId = req.user?.id;

    const book = await db.books.findOneBy({
      id: Number(bookId),
    });

    if (!book) {
      throw customError(StatusCodes.NOT_FOUND, nameError.bookNotFound, bookId);
    }

    book.pathToCover = `${config.pathToCover}${book.pathToCover}`;

    const myRating = await db.rating.findOne({
      where: {
        user: {
          id: Number(userId),
        },
        book: {
          id: Number(bookId),
        },
      },
    });

    if (myRating) {
      book.personalRating = myRating.rating;
    }

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
      book,
      commentsOfBook,
    });
  } catch (err) {
    next(err);
  }
};

export default getDetailBook;
