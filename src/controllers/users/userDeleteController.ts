require('express-async-errors');

import User from '../../db/entity/User'
import { AppDataSource } from '../../db/data-source';

export const user = async (request, response) => {
  const email = request.body.email

  const usersRepo = AppDataSource.getRepository(User);
  const userToDelete = await usersRepo.findOneBy({
    email: email,
  });
  await usersRepo.remove(userToDelete);

  response.send('delete user')
};