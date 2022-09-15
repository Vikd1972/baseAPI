require('express-async-errors');
const crypto = require("crypto");

import User from '../db/entity/User'
import { AppDataSource } from '../db/data-source';
import { Handler } from 'express';

import config from "../config"

const secretWord = config.secretWord;

export const checkToken: Handler = async (req, res, next) => {
  try {
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
      //next()
      res.send("authentication error");
    };
  } catch (err) {
    console.log(err)
  };
};

