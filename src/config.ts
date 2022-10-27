import 'reflect-metadata';
import dotenv from 'dotenv';
import path from 'path';

const localEnv = dotenv.config({ path: path.normalize(`${__dirname}/../.env`) }).parsed;
const defaultEnv = dotenv.config({ path: path.normalize(`${__dirname}./default.env`) }).parsed;

const joinedEnv = {
  ...defaultEnv,
  ...localEnv,
};

dotenv.config();
const config = {
  port: +joinedEnv.PORT,
  path: joinedEnv.LOCAL_PATH,
  db: {
    port: +joinedEnv.DB_PORT,
    host: joinedEnv.HOST,
    user: joinedEnv.DB_USERNAME,
    base: joinedEnv.DB_BASENAME,
    pass: joinedEnv.DB_PASS,
  },
  token: {
    salt: joinedEnv.PASSWORD_SALT,
    secretWord: joinedEnv.SECRET_WORD,
  },
};

export default config;
