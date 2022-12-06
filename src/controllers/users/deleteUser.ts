/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import type User from '../../db/entity/User';
import customError from '../../customError/customError';
import errorMessages from '../../utils/errorMessages';

type ParamsType = {
  userId: number;
};

// RequestHandlerParams<ParamsDictionary, any, any, ParsedQs, Record<string, any>>

type BodyType = Record<string, never>;

type RequestType = {
  email: string;
};

type ResponseType = {
  user: User;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, BodyType>;

const deleteUser: ControllerType = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await db.users.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, errorMessages.userNotFound, req.body.email);
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
