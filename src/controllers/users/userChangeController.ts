import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createHmac } from 'node:crypto';

import usersRepo from "../../db";
import customError from '../../customError/customError';
import nameError from '../../utils/utils';
import config from '../../config';

const changeUser: Handler = async (req, res, next) => {
  try {
    const { fullname, email, pass } = req.body;
    const userToChange = await usersRepo.findOneBy({
      email: email,
    });

    if (!userToChange) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, email);
    }
    
    if (fullname) {
      userToChange.fullname = fullname
    };

    if (pass) {
      userToChange.password = createHmac('sha256', pass).update(config.salt || '').digest('hex')
    };
    
    await usersRepo.save(userToChange);

    delete userToChange.password
    return res.status(StatusCodes.OK).json({
      message: 'user data changed',
      user: userToChange
    });
    
  } catch (err) {
    next(err)
  };
};

export default changeUser;