/* eslint-disable max-len */
/* eslint-disable no-console */
import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../db';
import getIdByToken from '../utils/getIdByToken';
import customError from '../customError/customError';
import errorMessages from '../utils/errorMessages';

export const checkToken: Handler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw customError(
        StatusCodes.UNAUTHORIZED, errorMessages.tokenNotFound, errorMessages.tokenNotFound,
      );
    }
    const userId = getIdByToken(req.headers.authorization);

    const user = await db.users.findOneBy({
      id: userId,
    });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, errorMessages.userNotFound, errorMessages.userNotFound);
    }

    req.user = user;
    return next();
  } catch (err) {
    next(err);
  }
};

export default checkToken;
