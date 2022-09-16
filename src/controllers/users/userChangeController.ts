require('express-async-errors');
import { Handler } from 'express';

import { usersRepo } from "../../db";
import customError from '../../customError/customError';

const changeUser: Handler = async (request, response, next) => {
  try {
    const oldemail = request.body.oldemail;
    const { fullname, email, dob, isAdmin } = request.body

    const userToChange = await usersRepo.findOneBy({
      email: oldemail,
    });
    if (userToChange === null) {
      throw customError(404, 'email not found', request.body.oldemail);
    }

    userToChange.fullname = fullname;
    userToChange.email = email;
    userToChange.dob = dob;
    userToChange.isAdmin = isAdmin;

    await usersRepo.save(userToChange);
    response.send('change user')    
  } catch (err) {
    next(err)
  };
};

export default changeUser;