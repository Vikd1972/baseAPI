import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { usersRepo } from '../../db';
import type User from '../../db/entity/User';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  id: string;
};

type ResponseType = {
  message: string;
  user: User[];
};

type ControllerType = RequestHandler<ParamsType, BodyType, RequestType, ResponseType>;

const getUsers: ControllerType = async (req, res, next) => {
  try {
    if (req.body.id) {
      const id = +req.body.id;
      const user = await usersRepo.findOneBy({
        id,
      });

      if (!user) {
        throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, `id: ${id}`);
      }
      user.photoFilePath = `http://localhost:3001/uploads/${user.photoFilePath}`;

      return res.status(StatusCodes.OK).format({
        user,
      });
    }

    const users = await usersRepo.find({
      relations: {
        cart: true,
        assessment: true,
        favorites: true,
      },
    });
    if (users.length === 0) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, 'no users in the database');
    }
    return res.status(StatusCodes.OK).format({
      users,
    });
  } catch (err) {
    next(err);
  }
};

export default getUsers;
