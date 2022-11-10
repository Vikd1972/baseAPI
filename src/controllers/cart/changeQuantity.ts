import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import type Cart from '../../db/entity/Cart';

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
    const userId = req.user?.id;

    const cart = await db.cart.findOneBy({
      id: cartId,
    });

    if (cart) {
      cart.count = count;
      await db.cart.save(cart);
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

export default changeQuantity;
