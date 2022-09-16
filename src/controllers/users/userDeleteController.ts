require('express-async-errors');
import { Handler } from 'express';

import { usersRepo } from "../../db";
import customError from '../../custmError/customError';

const deleteUser: Handler = async (request, response, next) => {
  try {
    const email = request.body.email

    const userToDelete = await usersRepo.findOneBy({
      email: email,
    });
    if (userToDelete === null) {
      throw customError(404, 'user not found', request.body.email);
    }

    await usersRepo.remove(userToDelete);
    response.send('delete user')
  } catch (err) {
    next(err)
  };
};

export default deleteUser;