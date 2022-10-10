
import { Handler } from 'express';
import * as jwt from 'jsonwebtoken'
// import { createHmac } from 'node:crypto';
import { createHmac } from 'crypto';
import { StatusCodes } from 'http-status-codes';

import User from '../../db/entity/User'
import usersRepo from "../../db";
import config from "../../config"
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const secretWord = config.secretWord;

const restoreUser: Handler = async (req, res, next) => {
  try {
    
    if (!req.headers.authorization) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.tokenNotFound, nameError.tokenNotFound)
    }

    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], secretWord || '') as jwt.JwtPayload
    const user = await usersRepo.findOneBy({
      id: decoded.id,
    })

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, nameError.userNotFound);
    }
    return res.status(StatusCodes.OK).json({
      user: user
    });

  } catch (err) {
    next(err);
  };
};

export default restoreUser;