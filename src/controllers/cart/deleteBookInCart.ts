import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';
import type Cart from '../../db/entity/Cart';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  id: number;
};

type ResponseType = {
  userCart: Cart[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, BodyType>;

const deleteBookInCart: ControllerType = async (req, res, next) => {
  try {
    const id = req.body.id;
    const userId = req.user?.id;

    const bookInCart = await db.cart.find({
      where: {
        user: {
          id: userId,
        },
        id,
      },
    });

    if (!bookInCart) {
      throw customError(StatusCodes.NOT_FOUND, nameError.bookNotFound, req.body.id);
    }

    await db.cart.remove(bookInCart);

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

export default deleteBookInCart;
