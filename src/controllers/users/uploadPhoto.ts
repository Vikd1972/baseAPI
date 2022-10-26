import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import fs from 'fs';

import { usersRepo } from '../../db';
import type User from '../../db/entity/User';
import config from '../../config';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  userPhoto: string;
  id: number;
};

type ResponseType = {
  user: User;
};

type ControllerType = RequestHandler<ParamsType, BodyType, RequestType, ResponseType>;

const secretWord = config.token.secretWord;

const uploadUserPhoto: ControllerType = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.tokenNotFound, nameError.tokenNotFound);
    }
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], secretWord || '') as jwt.JwtPayload;
    const userId = decoded.id as number;
    const file = req.body.userPhoto;
    const [data, base64] = file.split(',');
    const path = config.path || '';
    const fileName = `photo_${v4()}`;
    const fileExtension = data.slice(data.indexOf('/') + 1, data.indexOf(';'));
    const buffer = Buffer.from(base64, 'base64');

    fs.writeFile(`${path}/${fileName}.${fileExtension}`, buffer, (err) => {
      if (err) {
        throw customError(StatusCodes.BAD_REQUEST, nameError.errorLoading, nameError.errorLoading);
      }
    });

    const user = await usersRepo.findOneBy({
      id: userId,
    });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, nameError.userNotFound);
    }
    if (user.photoFilePath) {
      const file = user.photoFilePath.slice(29);
      fs.unlink(`${path}/${file}`, ((err) => {
        if (err) console.error(err);
      }));
    }

    user.photoFilePath = `http://localhost:3001/uploads/${fileName}.${fileExtension}`;
    await usersRepo.save(user);
    delete user.password;
    return res.status(StatusCodes.OK).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

export default uploadUserPhoto;
