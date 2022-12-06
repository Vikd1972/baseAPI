/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import config from '../../config';
import type Book from '../../db/entity/Book';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  favorites: number[];
};

type ResponseType = {
  books: Book[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, BodyType>;

const getFavoritesBooks: ControllerType = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await db.users.findOne({
      relations: {
        favorites: true,
      },
      where: {
        id: userId,
      },
    });

    let favoritesBook: Book[] = [];

    if (user?.favorites) {
      favoritesBook = user.favorites;
    }

    const books = favoritesBook.map((book) => {
      return {
        ...book,
        pathToCover: `${config.pathToCover}${book.pathToCover}`,
      };
    });

    return res.status(StatusCodes.OK).json({
      books,
    });
  } catch (err) {
    next(err);
  }
};

export default getFavoritesBooks;
