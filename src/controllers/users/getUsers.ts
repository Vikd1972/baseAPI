/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import config from '../../config';
import type User from '../../db/entity/User';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  id: string;
};

type ResponseType = {
  users?: User[];
  user?: User;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, BodyType>;

const getUsers: ControllerType = async (req, res, next) => {
  try {
    if (req.body.id) {
      const id = +req.body.id;
      const user = await db.users.findOneBy({
        id,
      });
      console.log(user);

      if (!user) {
        throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, `id: ${id}`);
      }
      user.photoFilePath = `${config.pathToImage}${user.photoFilePath}`;

      return res.status(StatusCodes.OK).json({
        user,
      });
    }

    const users = await db.users.find({
      relations: {
        cart: true,
        comment: true,
        favorites: true,
        rating: true,
      },
    });
    if (users.length === 0) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, 'no users in the database');
    }
    return res.status(StatusCodes.OK).json({
      users,
    });
  } catch (err) {
    next(err);
  }
};

export default getUsers;
