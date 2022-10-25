import 'reflect-metadata';
import dotenv from 'dotenv';
import path from 'path';

const localEnv = dotenv.parse(path.normalize(`${__dirname}/../.env`));
const defaultEnv = dotenv.parse(path.normalize(`${__dirname}/../default.env`));

const joinedEnv = {
  ...defaultEnv,
  ...localEnv,
};

const config2 = {
  port: +joinedEnv.PORT,
  db: {
    port: +joinedEnv.DB_PORT,
  },
  token: {
    secret: joinedEnv.TOKEN_SECRET,
  },
};

dotenv.config();

const config = {
  port: +(process.env.PORT ?? 4000),
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  base: process.env.DB_BASENAME,
  pass: process.env.DB_PASS,
  salt: process.env.PASSWORD_SALT,
  secretWord: process.env.SECRET_WORD,
  path: process.env.LOCAL_PATH,
};

export default config;
