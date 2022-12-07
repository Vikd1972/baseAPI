/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import type User from '../../db/entity/User';
import customError from '../../customError/customError';
import errorMessages from '../../utils/errorMessages';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type QueryType = {
  userId: string;
};

type ResponseType = {
  user: User;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, any, QueryType, BodyType>;

const deleteUser: ControllerType = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const user = await db.users.findOne({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, errorMessages.userNotFound, `userId: ${userId}`);
    }

    await db.users.remove(user);

    return res.status(StatusCodes.OK).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

export default deleteUser;
