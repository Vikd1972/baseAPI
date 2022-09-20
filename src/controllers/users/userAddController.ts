
import { Handler } from 'express';
import { createHmac } from 'node:crypto';

import User from '../../db/entity/User'
import { usersRepo } from "../../db";
import config from "../../config"

require('express-async-errors');

const addUser: Handler = async (request, response, next) => {
  try {
    const { fullname, email, dob, pass } = request.body
    const user = new User();
    user.fullname = fullname;
    user.email = email;
    user.dob = dob;
    user.password = createHmac('sha256', pass).update(config.salt || '').digest('hex');
    
    await usersRepo.save(user);
    return response.status(200).json('user added');
  } catch (err) {
    next(err); 
  };
};

export default addUser;