
import { Handler } from 'express';
import * as jwt from 'jsonwebtoken'
import { createHmac } from 'node:crypto';
import { StatusCodes } from 'http-status-codes';

import User from '../../db/entity/User'
import usersRepo from "../../db";
import config from "../../config"
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const secretWord = config.secretWord;

const signUser: Handler = async (req, res, next) => {
  try {
    const { fullname, email, dob, pass } = req.body
    const user = new User();
    user.fullname = fullname;
    user.email = email;
    user.dob = dob;
    user.password = createHmac('sha256', pass).update(config.salt || '').digest('hex');
    await usersRepo.save(user);

    const userToSign = await usersRepo.findOneBy({
      email: email,
    });

    if (!userToSign) {
      throw customError(StatusCodes.NOT_FOUND, nameError.user_writingError, req.body)
    } 
    
    return res.status(StatusCodes.OK).json({
      user: userToSign,
      token: jwt.sign({ id: userToSign.id }, secretWord || ''),
    })
    
  } catch (err) {
    next(err);
  };
};

export default signUser;