require('express-async-errors');
const crypto = require("crypto");
import { Handler } from 'express';
const jwt = require('jsonwebtoken')

import { usersRepo } from "../../db";
import config from "../../config"
import customError from '../../customError/customError';

const secretWord = config.secretWord;

const loginUser: Handler = async (request, response, next) => {
  try {
    const { fullname, password } = request.body    
    const userToLogin = await usersRepo.findOneBy({
      fullname: fullname,
    });    
    if (userToLogin === null) {
      throw customError(404, 'user not found', fullname);
    }

    const hash = crypto
      .pbkdf2Sync(password, config.salt, 1000, 64, `sha512`)
      .toString(`hex`);

    if (userToLogin.hash === hash && userToLogin.isAdmin === true) {
      return response.status(200).json({
        id: userToLogin.id,
        fullname: userToLogin.fullname,
        token: jwt.sign({ id: userToLogin.id }, secretWord),
      })


      // const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "jwt" })).toString("base64");
      // const payload = Buffer.from(JSON.stringify(userToLogin.email)).toString("base64");
      // const signature = crypto.createHmac("SHA256", secretWord).update(`${header}.${payload}`).digest("base64");
      // const token = `${header}.${payload}.${signature}`;
      // response.json(token);
    } else {
      throw customError(401, 'password is wrong', userToLogin.fullname);
    }
  } catch (err) {
    next(err);  
  };
};

export default loginUser;