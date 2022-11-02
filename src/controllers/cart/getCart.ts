import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { cartRepo } from '../../db';
import type Cart from '../../db/entity/Cart';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type ResponseType = {
  userCart: Cart[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, BodyType>;

const getCart: ControllerType = async (req, res, next) => {
  try {
    const userId = req.user?.id;

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

export default getCart;
