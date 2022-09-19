require('express-async-errors');
const jwt = require('jsonwebtoken');
import('node:crypto')

const crypto = require("crypto");
import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../../db/entity/User'
import { usersRepo } from "../../db";
import config from "../../config"
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const secretWord = config.secretWord;

const createHash = (pass: string) => {
  const hash = crypto
    .pbkdf2Sync(pass, config.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash;
}

const signUser: Handler = async (request, response, next) => {
  try {
    const { fullname, email, dob, pass } = request.body
    if (!fullname || !email || !dob || !pass) {
      throw customError(StatusCodes.PRECONDITION_FAILED, nameError.user_pf, request.body);
    }
    const user = new User();
    user.fullname = fullname;
    user.email = email;
    user.dob = dob;
    user.password = createHash(pass);
    await usersRepo.save(user);

    const userToSign = await usersRepo.findOneBy({
      email: email,
    });

    if (userToSign) {
      return response.status(200).json({
        user: {
          userToSign,
          token: jwt.sign({ id: userToSign.id }, secretWord),
        },
      })
    };
  } catch (err) {
    next(err);
  };
};

export default signUser;