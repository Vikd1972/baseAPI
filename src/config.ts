require('dotenv').config()

const config = {
  port: process.env.PORT,

  host: process.env.HOST,

  user: process.env.DB_USERNAME,

  base: process.env.DB_BASENAME,

  pass: process.env.DB_PASS,

  salt: process.env.PASSWORD_SALT,

  secretWord: process.env.SECRET_WORD
};

export default config;