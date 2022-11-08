import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import Cart from '../../db/entity/Cart';

import db from '../../db';

type ParamsType = Record<string, never>;

type RequestType = {
  bookId: number;
};

type ResponseType = {
  userCart: Cart[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, unknown>;

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

    if (cart.length === 0) {
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

    const userCart = await db.cart.find({
      relations: {
        book: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    });

    return res.status(StatusCodes.OK).json({
      userCart,
    });
  } catch (err) {
    next(err);
  }
};

export default addBookToCart;
