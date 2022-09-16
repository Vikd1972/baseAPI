require('express-async-errors');
const crypto = require("crypto");

import User from '../db/entity/User'
import { AppDataSource } from '../db/data-source';
import { Handler } from 'express';

import config from "../config"
import customError from '../custmError/customError';

const secretWord = config.secretWord;

export const checkToken: Handler = async (request, response, next) => {
  try {
    const usersRepo = AppDataSource.getRepository(User);
    const userAdmin = await usersRepo.findOneBy({
      fullname: 'Admin',
    });

    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "jwt" })).toString("base64");
    const payload = Buffer.from(JSON.stringify(userAdmin.email)).toString("base64");
    const signature = crypto.createHmac("SHA256", secretWord).update(`${header}.${payload}`).digest("base64");
    const token = `${header}.${payload}.${signature}`;  
    if ((request.headers.authorization !== undefined) && (token === request.headers.authorization.split(" ")[1])) {
      return next();
    } else {
      throw customError(401, 'authentication error', userAdmin.fullname);
    }
  } catch (err) {
    next(err)
  };
};

