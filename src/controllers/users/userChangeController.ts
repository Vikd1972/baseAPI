import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createHmac } from 'node:crypto';

import { usersRepo } from "../../db";
import customError from '../../customError/customError';
import nameError from '../../utils/utils';
import config from '../../config';

require('express-async-errors');

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
    userToChange.password = createHmac('sha256', pass).update(config.salt || '').digest('hex');

    await usersRepo.save(userToChange);
    return response.status(200).json('change user');
  } catch (err) {
    next(err)
  };
};

export default changeUser;