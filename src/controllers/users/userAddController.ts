require('express-async-errors');
const crypto = require("crypto");
import User from '../../db/entity/User'
import { AppDataSource } from '../../db/data-source';

export const user = async (request, response) => {
  const { fullname, email, dob, password } = request.body

  

  const user = new User();
  user.fullname = fullname;
  user.email = email;
  user.dob = dob;
  user.isAdmin = false;
 

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