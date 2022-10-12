
import { Handler } from 'express';
import * as jwt from 'jsonwebtoken'
import { createHmac } from 'crypto';
import { StatusCodes } from 'http-status-codes';

import User from '../../db/entity/User'
import {usersRepo} from "../../db";
import config from "../../config"
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const secretWord = config.secretWord;

const signUser: Handler = async (req, res, next) => {
  try {    
    const { fullname, email, password } = req.body
    const newUser = new User();
    newUser.fullname = fullname;
    newUser.email = email;
    newUser.password = createHmac('sha256', password).update(config.salt || '').digest('hex');
    await usersRepo.save(newUser);
    const user = await usersRepo.findOneBy({
      email: email,
    });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, nameError.writingError, req.body)
    }
    return res.status(StatusCodes.OK).json({
      user: user,
      token: jwt.sign({ id: user.id }, secretWord || ''),
    })

  } catch (err) {
    next(err);
  };
};

export default signUser;