require('express-async-errors');
import User from '../src/entity/User'
import { AppDataSource } from '../src/data-source';

export const user = async (request, response) => {
  const { fullname, email, dob } = request.body
  const user = new User();
  user.fullname = fullname;
  user.email = email;
  user.dob = dob;

  const usersRepo = AppDataSource.getRepository(User);
  await usersRepo.save(user);

  response.status(201).json({
    user: {
      id: user.id,
      name: fullname,
      email: email,
      dob: dob,
    },
  });
};