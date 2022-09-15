require('express-async-errors');
const crypto = require("crypto");
import { Handler } from 'express';

import { usersRepo } from "../../db";
import config from "../../config"

const secretWord = config.secretWord;

const loginUser: Handler = async (req, res) => {
  try {
    const { fullname, password } = req.body

    const userToLogin = await usersRepo.findOneBy({
      fullname: fullname,
    });

    const hash = crypto
      .pbkdf2Sync(password, config.salt, 1000, 64, `sha512`)
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
  } catch (err) {
    console.log(err)
  };
};

export default loginUser;