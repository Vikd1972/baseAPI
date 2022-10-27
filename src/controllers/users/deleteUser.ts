import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { usersRepo } from '../../db';
import type User from '../../db/entity/User';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  email: string;
};

type ResponseType = {
  message: string;
  user: User;
};

type ControllerType = RequestHandler<ParamsType, BodyType, RequestType, ResponseType>;

const deleteUser: ControllerType = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await usersRepo.findOneBy({
      email,
    });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, req.body.email);
    }

    await usersRepo.remove(user);
    return res.status(StatusCodes.OK).format({
      message: 'user deleted',
      user,
    });
  } catch (err) {
    next(err);
  }
};

export default deleteUser;
