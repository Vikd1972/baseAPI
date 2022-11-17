import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import config from '../../config';
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

    userCart.forEach((purchase) => {
      return Object.entries(purchase).map((item) => {
        if (item[0] === 'book') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-param-reassign
          item[1].pathToCover = `${config.pathToCover}${purchase.book.pathToCover}`;
        }
        return item;
      });
    });

    return res.status(StatusCodes.OK).json({
      userCart,
    });
  } catch (err) {
    next(err);
  }
};

export default changeQuantity;
