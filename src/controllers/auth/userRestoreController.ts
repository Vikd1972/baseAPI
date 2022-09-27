
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
const restoreUser: Handler = async (req, res, next) => {
  try {
    const token = req.body.token

    const decoded = jwt.verify(token, secretWord || '') as jwt.JwtPayload
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