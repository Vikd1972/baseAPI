require('express-async-errors');
import User from '../src/entity/User'
import { AppDataSource } from '../src/data-source';

export const user = async (request, response) => {
  const oldemail = request.body.oldemail;
  const { fullname, email, dob } = request.body 

  const usersRepo = AppDataSource.getRepository(User);
  const userToChange = await usersRepo.findOneBy({
    email: oldemail,
  });
  userToChange.fullname = fullname;
  userToChange.email = email;
  userToChange.dob = dob;

  await usersRepo.save(userToChange);

  response.send('change user')
};