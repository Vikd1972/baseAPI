require('dotenv').config();
interface Config {
  port?: number,
  host?: string,
  user?: string,
  base?: string,
  pass?: string,
  salt?: string,
  secretWord?: string
}


const config: Config = {
  port: +(process.env.PORT ?? 4000),
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  base: process.env.DB_BASENAME,
  pass: process.env.DB_PASS,
  salt: process.env.PASSWORD_SALT,
  secretWord: process.env.SECRET_WORD
};

export default config;