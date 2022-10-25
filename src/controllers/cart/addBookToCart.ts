import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import Cart from '../../db/entity/Cart';

import { booksRepo, usersRepo, cartRepo } from '../../db';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  userId: number;
  bookId: number;
};

type ResponseType = {
  userCart: Cart;
};

type ControllerType = RequestHandler<ParamsType, BodyType, RequestType, ResponseType>;

const addBookToCart: ControllerType = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;

    const cart = await cartRepo.find({
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

      const book = await booksRepo.findOne({
        relations: {
          cart: true,
        },
        where: {
          id: bookId,
        },
      });

      const user = await usersRepo.findOne({
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

      await cartRepo.save(newCart);
    }

    const userCart = await cartRepo.find({
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
