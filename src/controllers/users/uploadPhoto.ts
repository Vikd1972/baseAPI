/* eslint-disable max-len */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import fs from 'fs';

import db from '../../db';
import type User from '../../db/entity/User';
import config from '../../config';
import customError from '../../customError/customError';
import errorMessages from '../../utils/errorMessages';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  userPhoto: string;
  id: number;
};

type ResponseType = {
  user: User;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, BodyType>;

const secretWord = config.token.secretWord;

const uploadUserPhoto: ControllerType = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw customError(StatusCodes.UNAUTHORIZED, errorMessages.tokenNotFound, errorMessages.tokenNotFound);
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
        throw customError(StatusCodes.BAD_REQUEST, errorMessages.errorLoading, errorMessages.errorLoading);
      }
    });

    const user = await db.users.findOneBy({
      id: userId,
    });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, errorMessages.userNotFound, errorMessages.userNotFound);
    }

    if (user.photoFilePath) {
      fs.unlink(`${path}/${user.photoFilePath}`, ((err) => {
        if (err) console.error(err);
      }));
    }
    user.photoFilePath = `${fileName}.${fileExtension}`;
    await db.users.save(user);

    delete user.password;
    user.photoFilePath = `${config.pathToImage}${fileName}.${fileExtension}`;
    return res.status(StatusCodes.OK).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

export default uploadUserPhoto;
