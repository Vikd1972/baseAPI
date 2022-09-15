require('express-async-errors');
import { Handler } from 'express';

import { usersRepo } from "../../db";

const changeUser: Handler = async (request, response) => {
  try {
    const oldemail = request.body.oldemail;
    const { fullname, email, dob, isAdmin } = request.body

    const userToChange = await usersRepo.findOneBy({
      email: oldemail,
    });
    userToChange.fullname = fullname;
    userToChange.email = email;
    userToChange.dob = dob;
    userToChange.isAdmin = isAdmin;

    await usersRepo.save(userToChange);

    response.send('change user')
  } catch (err) {
    console.log(err)
  };
};

export default changeUser;