
import { Handler } from 'express';
import('node:crypto');

import User from '../../db/entity/User'
import { usersRepo } from "../../db";
import config from "../../config"

require('express-async-errors');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const secretWord = config.secretWord;

const createHash = (pass: string) => {
  const hash = crypto
    .pbkdf2Sync(pass, config.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash;
}

const signUser: Handler = async (request, response, next) => {
  try {
    const { fullname, email, dob, pass } = request.body
    const user = new User();
    user.fullname = fullname;
    user.email = email;
    user.dob = dob;
    user.password = createHash(pass);
    await usersRepo.save(user);

    const userToSign = await usersRepo.findOneBy({
      email: email,
    });

    if (userToSign) {
      return response.status(200).json({
        user: {
          userToSign,
        },
        token: jwt.sign({ id: userToSign.id }, secretWord),
      })
    };
  } catch (err) {
    next(err);
  };
};

export default signUser;