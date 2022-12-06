import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import type Cart from '../../db/entity/ItemInCart';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  cartId: number;
  count: number;
};

type ResponseType = {
  userCart: Cart[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, BodyType>;

const changeQuantity: ControllerType = async (req, res, next) => {
  try {
    const { cartId, count } = req.body;

    const cart = await db.cart.findOneBy({
      id: cartId,
    });

    if (cart) {
      cart.count = count;
      await db.cart.save(cart);
    }

    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default changeQuantity;
