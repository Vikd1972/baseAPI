/* eslint-disable max-len */
/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createHmac } from 'crypto';
import * as jwt from 'jsonwebtoken';

import db from '../../db';
import type User from '../../db/entity/User';
import customError from '../../customError/customError';
import errorMessages from '../../utils/errorMessages';
import config from '../../config';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  fullname: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ResponseType = {
  user: User;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, BodyType>;

const secretWord = config.token.secretWord;

const changeDataUser: ControllerType = async (req, res, next) => {
  try {
    const { fullname, email, oldPassword, newPassword, confirmPassword } = req.body;

    if (!req.headers.authorization) {
      throw customError(StatusCodes.UNAUTHORIZED, errorMessages.tokenNotFound, errorMessages.tokenNotFound);
    }
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], secretWord || '') as jwt.JwtPayload;
    const userId = decoded.id as number;
    const user = await db.users
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .addSelect('user.password')
      .getOne();

    const hash = createHmac('sha256', oldPassword || '').update(config.token.salt || '').digest('hex');

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, errorMessages.userNotFound, email);
    } else {
      if (fullname) {
        user.fullname = fullname;
      }

      if (email) {
        user.email = email;
      }

      if (oldPassword && (user.password !== hash)) {
        throw customError(StatusCodes.UNAUTHORIZED, errorMessages.passwordIsWrong, user.email);
      }

      if (oldPassword && (!newPassword || !confirmPassword)) {
        throw customError(StatusCodes.UNAUTHORIZED, errorMessages.newPassword, user.email);
      }

      if (!oldPassword && (newPassword || confirmPassword)) {
        throw customError(StatusCodes.UNAUTHORIZED, errorMessages.passwordIsWrong, user.email);
      }

      if (oldPassword && newPassword !== confirmPassword) {
        throw customError(StatusCodes.UNAUTHORIZED, errorMessages.passwordError, user.email);
      }

      if (oldPassword && newPassword === confirmPassword) {
        user.password = createHmac('sha256', newPassword).update(config.token.salt || '').digest('hex');
      }
    }

    await db.users.save(user);

    delete user.password;
    user.photoFilePath = `${config.pathToImage}${user.photoFilePath}`;
    return res.status(StatusCodes.OK).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

export default changeDataUser;
