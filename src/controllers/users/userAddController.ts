require('express-async-errors');
const crypto = require("crypto");
import { Handler } from 'express';

import User from '../../db/entity/User'
import { usersRepo } from "../../db";
import config from "../../config"
import customError from '../../custmError/customError';


const createHash = (password) => {
  const hash = crypto
    .pbkdf2Sync(password, config.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash;
}

const addUser: Handler = async (request, response, next) => {
  try {
    const { fullname, email, dob, password } = request.body

    if ((fullname === undefined) || (email === undefined) || (dob === undefined) || (password === undefined)) {
      throw customError(412, 'one or more fields are empty', request.body);
    }

    const user = new User();
    user.fullname = fullname;
    user.email = email;
    user.dob = dob;
    user.isAdmin = false;
    user.hash = createHash(password);
    
    await usersRepo.save(user);
    response.send('user added')

  } catch (err) {
    next(err); 
  };
};

export default addUser;