import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { cartRepo } from '../../db';
import type Cart from '../../db/entity/Cart';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  userId: number;
  id: number;
  count: number;
};

type ResponseType = {
  userCart: Cart[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, BodyType>;

const changeQuantity: ControllerType = async (req, res, next) => {
  try {
    const { userId, id, count } = req.body;

    const cart = await cartRepo.findOneBy({
      id,
    });

    if (cart) {
      cart.count = count;
      await cartRepo.save(cart);
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

export default changeQuantity;
