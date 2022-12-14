/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import type Book from '../../db/entity/Book';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  bookId: number;
};

type ResponseType = {
  myFavorites: Book[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, BodyType>;

const addOrRemoveToFavorites: ControllerType = async (req, res, next) => {
  try {
    const bookId = req.body.bookId;
    const userId = req.user?.id;

    const user = await db.users.findOne({
      relations: {
        favorites: true,
      },
      where: {
        id: userId,
      },
    });

    const book = await db.books.findOne({
      where: {
        id: bookId,
      },
    });

    if (book && user?.favorites) {
      const bookIndex = user.favorites.findIndex((item) => bookId === item.id);

      if (bookIndex !== -1) {
        user.favorites?.splice(bookIndex, 1);
        await db.users.save(user);
      } else {
        user.favorites?.push(book);
        await db.users.save(user);
      }
    }

    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default addOrRemoveToFavorites;
