require('express-async-errors');
import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { usersRepo } from "../../db";
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const changeUser: Handler = async (request, response, next) => {
  try {
    const { fullname, email, dob } = request.body;
    console.log(fullname);

    const userToChange = await usersRepo.findOneBy({
      email: email,
    });
    if (!userToChange) {
      throw customError(StatusCodes.NOT_FOUND, nameError.user_nf, request.body.oldemail);
    }
    userToChange.fullname = fullname;
    userToChange.dob = dob;    

    await usersRepo.save(userToChange);
    return response.status(200).json('change user');
  } catch (err) {
    next(err)
  };
};

export default changeUser;