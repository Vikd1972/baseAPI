import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import usersRepo from "../../db";
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const getUser: Handler = async (req, res, next) => {
  try {
    const users = await usersRepo.find();
      
    if (users.length === 0) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, nameError.userNotFound);
    }

    return res.status(StatusCodes.OK).json({ users });
      
  } catch (err) {
    next(err)
  };
};

export default getUser;