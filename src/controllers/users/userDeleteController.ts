import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import usersRepo from "../../db";
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const deleteUser: Handler = async (req, res, next) => {
  try {
    const email = req.body.email;
    const userToDelete = await usersRepo.findOneBy({
      email: email,
    });

    if (!userToDelete) {
      throw customError(StatusCodes.NOT_FOUND, nameError.user_userNotFound, req.body.email);
    }

    await usersRepo.remove(userToDelete);

    return res.status(StatusCodes.OK).json('user deleted');
    
  } catch (err) {
    next(err)
  };
};

export default deleteUser;