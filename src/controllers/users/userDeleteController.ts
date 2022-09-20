import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { usersRepo } from "../../db";
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

require('express-async-errors');

const deleteUser: Handler = async (request, response, next) => {
  try {
    const email = request.body.email;
    const userToDelete = await usersRepo.findOneBy({
      email: email,
    });
    if (!userToDelete) {
      throw customError(StatusCodes.NOT_FOUND, nameError.user_nf, request.body.email);
    }

    await usersRepo.remove(userToDelete);
    return response.status(200).json('delete user');
  } catch (err) {
    next(err)
  };
};

export default deleteUser;