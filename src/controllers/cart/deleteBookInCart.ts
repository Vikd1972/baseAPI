import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import customError from '../../customError/customError';
import errorMessages from '../../utils/errorMessages';
import type Cart from '../../db/entity/ItemInCart';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  cartId: number;
};

type ResponseType = {
  userCart: Cart[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, BodyType>;

const deleteBookInCart: ControllerType = async (req, res, next) => {
  try {
    const cartId = req.body.cartId;

    const bookInCart = await db.cart.findOne({
      where: {
        id: cartId,
      },
    });

    if (!bookInCart) {
      throw customError(StatusCodes.NOT_FOUND, errorMessages.bookNotFound, req.body.cartId);
    }

    await db.cart.remove(bookInCart);

    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default deleteBookInCart;
