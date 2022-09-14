require('express-async-errors');
import User from '../src/entity/User'
import { AppDataSource } from '../src/data-source';

export const user = async (request, response) => {
  const email = request.body.email

  const userDeleteRepo = AppDataSource.getRepository(User);
  await userDeleteRepo.delete({email: email});

  response.send('delete user')
};