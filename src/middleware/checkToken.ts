import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken'

import { usersRepo } from "../db";
import config from "../config"
import customError from '../customError/customError';
import nameError from '../utils/utils';
import { AuthInfoRequest } from '../definions/request';

require('express-async-errors');

const secretWord = config.secretWord;

export const checkToken = async (request: AuthInfoRequest, response: Response, next: NextFunction) => {
  try {    
    if (request.headers.authorization) {
      const decoded = await jwt.verify(request.headers.authorization.split(' ')[1], secretWord || '') as jwt.JwtPayload    
      const userToLogin = await usersRepo
        .createQueryBuilder("user")
        .where("user.id = :id", { id: decoded.id })
        .getOne();
      
      if (!userToLogin) {
        throw customError(StatusCodes.NOT_FOUND, nameError.user_userNotFound, nameError.user_userNotFound);
      } else {
        request.user = userToLogin;
        return next();
      }

    } else {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.user_tokenNotFound, nameError.user_tokenNotFound)
    }
  } catch (err) {
    next(err)
  };
};

export default checkToken;