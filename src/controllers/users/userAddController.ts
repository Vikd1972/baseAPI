require('express-async-errors');
const crypto = require("crypto");
import User from '../../db/entity/User'
import { AppDataSource } from '../../db/data-source';
const config = require('../../config')

export const user = async (request, response) => {
  const { fullname, email, dob, password } = request.body  

  const hash = crypto
    .pbkdf2Sync(password, config.default.salt, 1000, 64, `sha512`)
    .toString(`hex`);

  const user = new User();
  user.fullname = fullname;
  user.email = email;
  user.dob = dob;
  user.isAdmin = false; 
  user.hash = hash;

  const usersRepo = AppDataSource.getRepository(User);
  await usersRepo.save(user);

  response.status(201).json({
    user: {
      id: user.id,
      name: fullname,
      email: email,
      dob: dob,
    },
  });
};