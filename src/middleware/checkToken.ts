import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken'

import { usersRepo } from "../db";
import config from "../config"
import customError from '../customError/customError';
import nameError from '../utils/utils';
import { AuthInfoRequest } from '../definions/request';

const secretWord = config.secretWord;

export const checkToken = async (req: AuthInfoRequest, res: Response, next: NextFunction) => {
  try {    
    if (!req.headers.authorization) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.user_tokenNotFound, nameError.user_tokenNotFound)
    } 
    
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], secretWord || '') as jwt.JwtPayload
    const userToLogin = await usersRepo.findOneBy({
      id: decoded.id,
    })

    if (!userToLogin) {
      throw customError(StatusCodes.NOT_FOUND, nameError.user_userNotFound, nameError.user_userNotFound);
    } 
    
    req.user = userToLogin;
    return next();    
  } catch (err) {
    next(err)
  };
};

export default checkToken;