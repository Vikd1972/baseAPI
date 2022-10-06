
import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken'
import { createHmac } from 'node:crypto';
<<<<<<< HEAD
import {
  createReadStream
} from 'node:fs';
=======
>>>>>>> e00b48867c8013cba9002a2055637d03e7e0db51

import usersRepo from "../../db";
import config from "../../config"
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const secretWord = config.secretWord;

const loginUser: Handler = async (req, res, next) => {
  try {
    
    const { email, pass } = req.body;
    const user = await usersRepo.
      createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .addSelect("user.password")
      .getOne()
    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, email);
    }

    const hash = createHmac('sha256', pass).update(config.salt || '').digest('hex');
    
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

export default loginUser;