require('express-async-errors');
const crypto = require("crypto");
import { Handler } from 'express';

import User from '../../db/entity/User'
import { usersRepo } from "../../db";
import config from "../../config"
//import CustomError from '../../errorHandler/customError';
const CustomError = require('../../errorHandler/customError')

const createHash = (password) => {
  const hash = crypto
    .pbkdf2Sync(password, config.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash;
}

const addUser: Handler = async (request, response) => {
  try {
    const { fullname, email, dob, password } = request.body

    if ((fullname === null) || (email === null) || (dob === null) || (password === null)) {
      throw new CustomError 
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
    if (err instanceof CustomError) {
      response.status(412).json('message')
    } else {
      return response.status(500).send({
        error: 'GENERIC',
        description: 'Something went wrong. Please contact support.',
      })
    }

    console.log(err)
  };
};

export default addUser;