
import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken'
import { createHmac } from  'node:crypto';

import usersRepo from "../../db";
import config from "../../config"
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const secretWord = config.secretWord;

const loginUser: Handler = async (req, res, next) => {
  try {
    const { email, pass } = req.body;   
    const userToLogin = await usersRepo.
      createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .addSelect("user.password")
      .getOne()

    if (!userToLogin) {
      throw customError(StatusCodes.NOT_FOUND, nameError.user_userNotFound, email);
    }

    const hash = createHmac('sha256', pass).update(config.salt || '').digest('hex');

    if (userToLogin.password !== hash) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.user_passwordIsWrong, userToLogin.fullname);      
    } 
    
    delete userToLogin.password
    return res.status(StatusCodes.OK).json({
      user: userToLogin,
      token: jwt.sign({ id: userToLogin.id }, secretWord || ''),
    })
    
  } catch (err) {
    next(err);  
  };
};

export default loginUser;