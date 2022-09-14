require('express-async-errors');
import User from '../src/entity/User'
import { AppDataSource } from '../src/data-source';

export const user = async (request, response) => {
  const email = request.body.email

  const usersRepo = AppDataSource.getRepository(User);
  const userToDelete = await usersRepo.findOneBy({
    email: email,
  });
  await usersRepo.remove(userToDelete);

  response.send('delete user')
};