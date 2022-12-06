import * as jwt from 'jsonwebtoken';

import config from '../config';

const secretWord = config.token.secretWord;

const getIdByToken = (token: string) => {
  const decoded = jwt.verify(token.split(' ')[1], secretWord || '') as jwt.JwtPayload;
  const userId = decoded.id as number;
  return userId;
};

export default getIdByToken;
