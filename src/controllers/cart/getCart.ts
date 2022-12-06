/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import config from '../../config';
import type Cart from '../../db/entity/ItemInCart';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type ResponseType = {
  userCart: Cart[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, BodyType>;

const getCart: ControllerType = async (req, res, next) => {
  try {
    const userId = req.user?.id;

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

export default getCart;
