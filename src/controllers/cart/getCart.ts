import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { cartRepo } from '../../db';
import type Cart from '../../db/entity/Cart';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  id: number;
};

type ResponseType = {
  userCart: Cart;
};

type ControllerType = RequestHandler<ParamsType, BodyType, RequestType, ResponseType>;

const getCart: ControllerType = async (req, res, next) => {
  try {
    const id = req.body.id;

    const userCart = await cartRepo.find({
      relations: {
        book: true,
      },
      where: {
        user: {
          id,
        },
      },
    });

    return res.status(StatusCodes.OK).json(
      userCart,
    );
  } catch (err) {
    next(err);
  }
};

export default getCart;
