import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createHmac } from 'node:crypto';
import * as jwt from 'jsonwebtoken'

import usersRepo from "../../db";
import customError from '../../customError/customError';
import nameError from '../../utils/utils';
import config from "../../config"

const secretWord = config.secretWord;

const changeUser: Handler = async (req, res, next) => {    
  try {    
    if (!req.headers.authorization) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.tokenNotFound, nameError.tokenNotFound)
    }
    const decoded = jwt.verify(req.headers.authorization, secretWord || '') as jwt.JwtPayload;
    
    const user = await usersRepo.findOneBy({
      id: decoded.id,
    })
    
    const { fullname, email, oldPassword, newPassword } = req.body;
    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, email);
    } else {
      if (fullname) {
        user.fullname = fullname
      };
      if (email) {
        user.email = email
      };
      if (oldPassword && !newPassword) {
        throw customError(StatusCodes.UNAUTHORIZED, nameError.passwordError, email);
      } else {
        user.password = createHmac('sha256', newPassword).update(config.salt || '').digest('hex')
      };
    }

    await usersRepo.save(user);
    delete user.password
    return res.status(StatusCodes.OK).json({
      user: user
    });
    
  } catch (err) {
    next(err)
  };
};

export default changeUser;