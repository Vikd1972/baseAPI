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

export const checkToken = (request: AuthInfoRequest, response: Response, next: NextFunction) => {
  try {    
    if (request.headers.authorization) {
      const decoded = jwt.verify(request.headers.authorization.split(' ')[1], secretWord || '') as jwt.JwtPayload       
      const userToLogin = usersRepo.findOneBy({
        id: decoded.id,
      });
      if (!userToLogin) {
        throw customError(StatusCodes.NOT_FOUND, nameError.user_nf, nameError.user_nf);
      } else {
        userToLogin.then(result => {    
          if (result) request.user = result;
        })
        return next()
      }
    } else {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.user_ua, nameError.user_ua)
    }
  } catch (err) {
    next(err)
  };
};

export default checkToken;