import type { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import type User from '../../db/entity/User';
import type Cart from '../../db/entity/Cart';
import config from '../../config';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const secretWord = config.token.secretWord;

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type ResponseType = {
  user: User;
  userCart: Cart[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, BodyType>;

const restoreUser: ControllerType = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.tokenNotFound, nameError.tokenNotFound);
    }

    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], secretWord || '') as jwt.JwtPayload;
    const userId = decoded.id as number;

    const user = await db.users.findOne({
      relations: {
        cart: true,
        comment: true,
        favorites: true,
        rating: true,
      },
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, nameError.userNotFound);
    }
    user.photoFilePath = `${config.pathToImage}${user.photoFilePath}`;

    const userCart = await db.cart.find({
      relations: {
        book: true,
      },
      where: {
        user: {
          id: user.id,
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
      user,
      userCart,
    });
  } catch (err) {
    next(err);
  }
};

export default restoreUser;
