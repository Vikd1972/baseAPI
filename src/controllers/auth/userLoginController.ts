require('express-async-errors');

const crypto = require("crypto");
import { Handler } from 'express';
//import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');
import { StatusCodes } from 'http-status-codes';
import { AppDataSource } from '../../db/data-source';
import { usersRepo } from "../../db";

import config from "../../config"
import customError from '../../customError/customError';
import nameError from '../../utils/utils';
import User from '../../db/entity/User';

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
    const hash = crypto
      .pbkdf2Sync(pass, config.salt, 1000, 64, `sha512`)
      .toString(`hex`);
    if (userToLogin.password === hash) {
      
      return response.status(200).json({
        user: {
          userToLogin,
        },
        token: jwt.sign({ id: userToLogin.id }, secretWord),
      })
    } else {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.user_pw, userToLogin.fullname);
    }
  } catch (err) {
    next(err);  
  };
};

export default loginUser;