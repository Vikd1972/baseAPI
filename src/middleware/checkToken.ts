require('express-async-errors');
const crypto = require("crypto");

import User from '../db/entity/User'
import { AppDataSource } from '../db/data-source';
const config = require('../config')

const secretWord = config.default.secretWord;

export const checkToken = async (req, res, next) => {

  const usersRepo = AppDataSource.getRepository(User);
  const userAdmin = await usersRepo.findOneBy({
    fullname: 'Admin',
  });

  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "jwt" })).toString("base64");
  const payload = Buffer.from(JSON.stringify(userAdmin.email)).toString("base64");
  const signature = crypto.createHmac("SHA256", secretWord).update(`${header}.${payload}`).digest("base64");
  const token = `${header}.${payload}.${signature}`;

  if ((req.headers.authorization !== undefined) && (token === req.headers.authorization.split(" ")[1])) {
    return next();
  } else {
    res.send("authentication error");
  };
};