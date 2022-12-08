/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable max-len */
/* eslint-disable no-console */
// import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import Comment from '../db/entity/Comment';
import customError from '../customError/customError';
import errorMessages from '../utils/errorMessages';
// import config from '../../config';

import db from '../db';
import type User from '../db/entity/User';

type OptionsType = {
  id: number;
  comment: string;
  commentData: Date;
  user: {
    id: number;
    fullname: string;
    email: string;
    photoFilePath: string;
  };
};

const setComment = async (options: OptionsType) => {
  try {
    const book = await db.books.findOne({
      where: {
        id: options.id,
      },
    });

    if (!book) {
      throw customError(StatusCodes.UNAUTHORIZED, errorMessages.bookNotFound, errorMessages.bookNotFound);
    }

    const newComment = new Comment();

    newComment.comment = options.comment;
    newComment.commentData = options.commentData;
    newComment.user = options.user as User;
    newComment.book = book;

    await db.comments.save(newComment);
  } catch (err) {
    console.log(err);
  }
};

export default setComment;
