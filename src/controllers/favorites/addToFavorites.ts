import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import type User from '../../db/entity/User';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  bookId: number;
};

type ResponseType = {
  newUser: User;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, BodyType>;

const addToFavorites: ControllerType = async (req, res, next) => {
  try {
    const bookId = req.body.bookId;
    const userId = req.user?.id;

    const user = await db.users.findOne({
      where: {
        id: userId,
      },
    });

    const book = await db.books.findOne({
      where: {
        id: bookId,
      },
    });

    if (book && user) {
      const bookIndex = user.favorites?.findIndex((item) => bookId === item.id);

      if (bookIndex && bookIndex !== -1) {
        user.favorites?.splice(bookIndex, 1);
        await db.users.save(user);
      } else {
        user.favorites?.push(book);
        await db.users.save(user);
      }
    }

    const newUser = await db.users.findOne({
      where: {
        id: userId,
      },
    });
    if (newUser) {
      return res.status(StatusCodes.OK).json({
        newUser,
      });
    }
  } catch (err) {
    next(err);
  }
};

export default addToFavorites;
