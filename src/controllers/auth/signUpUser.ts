import type { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';
import { createHmac } from 'crypto';
import { StatusCodes } from 'http-status-codes';

import User from '../../db/entity/User';
import { usersRepo } from '../../db';
import config from '../../config';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const secretWord = config.token.secretWord;

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  fullname: string;
  email: string;
  password: string;
};

type ResponseType = {
  user: User;
  token: string;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, BodyType>;

const signUpUser: ControllerType = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    const newUser = new User();
    newUser.fullname = fullname;
    newUser.email = email;
    newUser.password = createHmac('sha256', password).update(config.token.salt || '').digest('hex');

    await usersRepo.save(newUser);

    const user = await usersRepo.findOne({
      relations: {
        cart: true,
        comment: true,
        favorites: true,
        rating: true,
      },
      where: {
        email,
      },
    });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, nameError.writingError, req.body);
    }
    user.photoFilePath = `http://localhost:4001/uploads/${user.photoFilePath}`;
    return res.status(StatusCodes.OK).json({
      user,
      token: jwt.sign({ id: user.id }, secretWord || ''),
    });
  } catch (err) {
    next(err);
  }
};

export default signUpUser;
