
import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken'
import { createHmac } from 'crypto';

import {usersRepo} from "../../db";
import config from "../../config"
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const secretWord = config.secretWord;

const authUser: Handler = async (req, res, next) => {
  try {    
    const { email, password } = req.body;
    const user = await usersRepo
      .createQueryBuilder("user")   
      .where("user.email = :email", { email: email })
      .addSelect("user.password")
      .getOne();
    
    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, email);
    }

    const hash = createHmac('sha256', password).update(config.salt || '').digest('hex');
    
    if (user.password !== hash) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.passwordIsWrong, user.fullname);
    }

    delete user.password
    return res.status(StatusCodes.OK).json({
      user: user,
      token: jwt.sign({ id: user.id }, secretWord || ''),
    })

  } catch (err) {
    next(err);
  };
};

export default authUser;