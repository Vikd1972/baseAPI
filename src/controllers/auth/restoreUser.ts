import type { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import { usersRepo } from '../../db';
import type User from '../../db/entity/User';
import config from '../../config';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const secretWord = config.token.secretWord;

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type ResponseType = {
  user: User;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, BodyType>;

const restoreUser: ControllerType = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.tokenNotFound, nameError.tokenNotFound);
    }

    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], secretWord || '') as jwt.JwtPayload;
    const userId = decoded.id as number;

    const user = await usersRepo.findOne({
      relations: {
        cart: true,
        assessment: true,
        favorites: true,
      },
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, nameError.userNotFound);
    }
    return res.status(StatusCodes.OK).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

export default restoreUser;
