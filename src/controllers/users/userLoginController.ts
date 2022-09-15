require('express-async-errors');
const crypto = require("crypto");

import User from '../../db/entity/User'
import { AppDataSource } from '../../db/data-source';
const config = require('../../config')

const secretWord = config.default.secretWord;

export const user = async (req, res) => {
  const { fullname, password } = req.body  

  const usersRepo = AppDataSource.getRepository(User);
  const userToLogin = await usersRepo.findOneBy({
    fullname: fullname,
  });

  const hash = crypto
    .pbkdf2Sync(password, config.default.salt, 1000, 64, `sha512`)
    .toString(`hex`);

  if (userToLogin.hash === hash && userToLogin.isAdmin === true) {
    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "jwt" })).toString("base64");
    const payload = Buffer.from(JSON.stringify(userToLogin.email)).toString("base64");
    const signature = crypto.createHmac("SHA256", secretWord).update(`${header}.${payload}`).digest("base64");
    const token = `${header}.${payload}.${signature}`;
    res.json(token);
  } else {
    res.send("wrong password");
  }

};