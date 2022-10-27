import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { booksRepo, usersRepo } from '../../db';
import type User from '../../db/entity/User';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  userId: number;
  bookId: number;
};

type ResponseType = {
  newUser: User;
};

type ControllerType = RequestHandler<ParamsType, BodyType, RequestType, ResponseType>;

const addToFavorites: ControllerType = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;

    const user = await usersRepo.findOne({
      where: {
        id: userId,
      },
    });

    const book = await booksRepo.findOne({
      where: {
        id: bookId,
      },
    });

    if (book && user) {
      const bookIndex = user.favorites?.findIndex((item) => bookId === item.id);

      if (bookIndex && bookIndex !== -1) {
        user.favorites?.splice(bookIndex, 1);
        await usersRepo.save(user);
      } else {
        user.favorites?.push(book);
        await usersRepo.save(user);
      }
    }

    const newUser = await usersRepo.findOne({
      where: {
        id: userId,
      },
    });
    if (newUser) {
      return res.status(StatusCodes.OK).format({
        newUser,
      });
    }
  } catch (err) {
    next(err);
  }
};

export default addToFavorites;
