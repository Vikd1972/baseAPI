/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import Cart from '../../db/entity/ItemInCart';

import db from '../../db';

type ParamsType = Record<string, never>;

type RequestType = {
  bookId: number;
};

type ControllerType = RequestHandler<ParamsType, unknown, RequestType, unknown>;

const addBookToCart: ControllerType = async (req, res, next) => {
  try {
    const bookId = req.body.bookId;
    const userId = req.user?.id;

    const cart = await db.cart.find({
      where: {
        book: {
          id: bookId,
        },
        user: {
          id: userId,
        },
      },
    });

    if (!cart.length) {
      const newCart = new Cart();

      const book = await db.books.findOne({
        relations: {
          cart: true,
        },
        where: {
          id: bookId,
        },
      });

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

      newCart.count = 1;
      if (user) newCart.user = user;
      if (book) newCart.book = book;

      await db.cart.save(newCart);
    }

    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default addBookToCart;
