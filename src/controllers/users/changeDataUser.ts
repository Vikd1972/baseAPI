import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createHmac } from 'crypto';
import * as jwt from 'jsonwebtoken'

import {usersRepo }from "../../db";
import customError from '../../customError/customError';
import nameError from '../../utils/utils';
import config from "../../config"

const secretWord = config.secretWord;

const changeDataUser: Handler = async (req, res, next) => {
  try {
    const { fullname, email, oldPassword, newPassword, confirmPassword } = req.body;    

    if (!req.headers.authorization) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.tokenNotFound, nameError.tokenNotFound)
    }
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], secretWord || '') as jwt.JwtPayload;

    const user = await usersRepo.
      createQueryBuilder("user")
      .where("user.id = :id", { id: decoded.id })
      .addSelect("user.password")
      .getOne()

    const hash = createHmac('sha256', oldPassword || '').update(config.salt || '').digest('hex');

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, email);
    } else {
      if (fullname) {
        user.fullname = fullname
      };

      if (email) {
        user.email = email
      };

      if (oldPassword && (user.password !== hash)) {
        throw customError(StatusCodes.UNAUTHORIZED, nameError.passwordIsWrong, user.email);
      }

      if (oldPassword && (!newPassword || !confirmPassword)) {
        throw customError(StatusCodes.UNAUTHORIZED, nameError.newPassword, user.email);
      }

      if (!oldPassword && (newPassword || confirmPassword)) {
        throw customError(StatusCodes.UNAUTHORIZED, nameError.passwordIsWrong, user.email);
      }

      if (oldPassword && newPassword !== confirmPassword) {
        throw customError(StatusCodes.UNAUTHORIZED, nameError.passwordError, user.email);
      }

      if (oldPassword && newPassword === confirmPassword) {
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

export default changeDataUser;