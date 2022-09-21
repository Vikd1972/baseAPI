
import { Handler } from 'express';
import { createHmac } from 'node:crypto';
import { StatusCodes } from 'http-status-codes';

import customError from '../../customError/customError';
import nameError from '../../utils/utils';
import User from '../../db/entity/User'
import usersRepo from "../../db";
import config from "../../config"

const addUser: Handler = async (req, res, next) => {
  try {
    const { fullname, email, dob, pass } = req.body
    const user = new User();
    user.fullname = fullname;
    user.email = email;
    user.dob = dob;
    user.password = createHmac('sha256', pass).update(config.salt || '').digest('hex');    
    await usersRepo.save(user);

    const userToAdd = await usersRepo.findOneBy({
      email: email,
    });

    if (!userToAdd) {
      throw customError(StatusCodes.NOT_FOUND, nameError.user_writingError, req.body)
    } 

    return res.status(StatusCodes.OK).json('user added');
    
  } catch (err) {
    next(err); 
  };
};

export default addUser;