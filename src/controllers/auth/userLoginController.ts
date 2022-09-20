
import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken'
import { createHmac } from  'node:crypto';

import { usersRepo } from "../../db";
import config from "../../config"
import customError from '../../customError/customError';
import nameError from '../../utils/utils';


require('express-async-errors');

const secretWord = config.secretWord;

const loginUser: Handler = async (request, response, next) => {
  try {
    const { email, pass } = request.body;   

    const userToLogin = await usersRepo.
      createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .addSelect("user.password")
      .getOne()

    if (!userToLogin) {
      throw customError(StatusCodes.NOT_FOUND, nameError.user_nf, email);
    }

    const hash = createHmac('sha256', pass).update(config.salt || '').digest('hex');
    
    if (userToLogin.password === hash) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.user_pw, userToLogin.fullname);      
    } else {
      delete userToLogin.password
      return response.status(200).json({
        user: {
          userToLogin,
        },
        token: jwt.sign({ id: userToLogin.id }, secretWord || ''),
      })
    }
  } catch (err) {
    next(err);  
  };
};

export default loginUser;