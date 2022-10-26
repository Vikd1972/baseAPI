import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { createHmac } from 'crypto';

import { usersRepo } from '../../db';
import type User from '../../db/entity/User';
import config from '../../config';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  email: string;
  password: string;
};

type ResponseType = {
  user: User;
  token: string;
};

type ControllerType = RequestHandler<ParamsType, BodyType, RequestType, ResponseType>;

const secretWord = config.token.secretWord;

const authUser: ControllerType = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.favorites', 'favorite')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, email);
    }

    const hash = createHmac('sha256', password).update(config.token.salt || '').digest('hex');

    if (user.password !== hash) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.passwordIsWrong, user.fullname);
    }

    delete user.password;
    return res.status(StatusCodes.OK).json({
      user,
      token: jwt.sign({ id: user.id }, secretWord || ''),
    });
  } catch (err) {
    next(err);
  }
};

export default authUser;
