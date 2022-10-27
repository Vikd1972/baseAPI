import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { cartRepo } from '../../db';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';
import type Cart from '../../db/entity/Cart';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  userId: number;
  id: number;
};

type ResponseType = {
  userCart: Cart;
};

type ControllerType = RequestHandler<ParamsType, BodyType, RequestType, ResponseType>;

const deleteBookInCart: ControllerType = async (req, res, next) => {
  try {
    const { id, userId } = req.body;

    const bookInCart = await cartRepo.find({
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

    await cartRepo.remove(bookInCart);

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

    return res.status(StatusCodes.OK).format({
      userCart,
    });
  } catch (err) {
    next(err);
  }
};

export default deleteBookInCart;
