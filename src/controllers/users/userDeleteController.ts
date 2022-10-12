import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import {usersRepo} from "../../db";
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const deleteUser: Handler = async (req, res, next) => {  
  try {
    const email = req.body.email;
    const user = await usersRepo.findOneBy({
      email: email,
    });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, req.body.email);
    }

    await usersRepo.remove(user);
    return res.status(StatusCodes.OK).json({
      message: 'user deleted',
      user: user
    });
    
  } catch (err) {
    next(err)
  };
};

export default deleteUser;