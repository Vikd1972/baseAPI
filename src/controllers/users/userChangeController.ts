require('express-async-errors');

import User from '../../db/entity/User'
import { AppDataSource } from '../../db/data-source';

export const user = async (request, response) => {
  const oldemail = request.body.oldemail;
  const { fullname, email, dob, isAdmin} = request.body 

  const usersRepo = AppDataSource.getRepository(User);
  const userToChange = await usersRepo.findOneBy({
    email: oldemail,
  });
  userToChange.fullname = fullname;
  userToChange.email = email;
  userToChange.dob = dob;
  userToChange.isAdmin = isAdmin;

  await usersRepo.save(userToChange);

  response.send('change user')
};