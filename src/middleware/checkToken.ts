/* eslint-disable no-console */
import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';

import db from '../db';
import config from '../config';
import customError from '../customError/customError';
import nameError from '../utils/utils';

const secretWord = config.token.secretWord;

export const checkToken: Handler =
  async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        throw customError(
          StatusCodes.UNAUTHORIZED, nameError.tokenNotFound, nameError.tokenNotFound,
        );
      }

      const decoded =
        jwt.verify(req.headers.authorization.split(' ')[1], secretWord || '') as jwt.JwtPayload;
      const userId = decoded.id as number;
      const user = await db.users.findOneBy({
        id: userId,
      });

      if (!user) {
        throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, nameError.userNotFound);
      }

      req.user = user;
      return next();
    } catch (err) {
      next(err);
    }
  };

export default checkToken;
