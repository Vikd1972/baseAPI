import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import config from '../../config';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';
import type Cart from '../../db/entity/Cart';

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
    const userId = req.user?.id;

    const bookInCart = await db.cart.findOne({
      where: {
        id: cartId,
      },
    });

    if (!bookInCart) {
      throw customError(StatusCodes.NOT_FOUND, nameError.bookNotFound, req.body.cartId);
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

export default deleteBookInCart;
