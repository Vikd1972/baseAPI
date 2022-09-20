import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
//import _crypto from 'crypto'

import { usersRepo } from "../../db";
import customError from '../../customError/customError';
import nameError from '../../utils/utils';
import config from '../../config';

require('express-async-errors');
const crypto = require("crypto");

const createHash = (pass: string) => {
  const hash = crypto
    .pbkdf2Sync(pass, config.salt ?? '', 1000, 64, `sha512`)
    .toString(`hex`);
  return hash;
}

const changeUser: Handler = async (request, response, next) => {
  try {
    const { fullname, email, dob, pass } = request.body;
    console.log(fullname);

    const userToChange = await usersRepo.findOneBy({
      email: email,
    });
    if (!userToChange) {
      throw customError(StatusCodes.NOT_FOUND, nameError.user_nf, request.body.oldemail);
    }
    userToChange.fullname = fullname;
    userToChange.dob = dob;    
    userToChange.password = createHash(pass);

    await usersRepo.save(userToChange);
    return response.status(200).json('change user');
  } catch (err) {
    next(err)
  };
};

export default changeUser;