require('express-async-errors');
const jwt = require('jsonwebtoken');

import { Response, NextFunction } from 'express';
import { usersRepo } from "../db";

import config from "../config"
import customError from '../customError/customError';
import { AuthInfoRequest } from '../definions/request';

const secretWord = config.secretWord;

export const checkToken = (request: AuthInfoRequest, response: Response, next: NextFunction) => {
  try {
    if (request.headers.authorization) {
      console.log('error: ' + request.headers.authorization);
      
      const decoded = jwt.verify(request.headers.authorization.split(' ')[1], secretWord)
      const userToLogin = usersRepo.findOneBy({
        id: decoded.id,
      });
      if (userToLogin === null) {
        throw customError(404, 'user not found', 'user not found');
      } else {
        userToLogin.then(result => {    
          if (result !== null) request.User = result;
        })
        next()
      }
    } else {
      throw customError(401, 'token not found', 'token not found')
    }
  } catch (err) {
    next(err)
  };
};

