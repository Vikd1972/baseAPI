import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import fs from 'fs';

import usersRepo from "../../db";
import config from "../../config";
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const secretWord = config.secretWord;

const uploadUserPhoto: Handler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.tokenNotFound, nameError.tokenNotFound)
    }
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], secretWord || '') as jwt.JwtPayload

    const file = req.body.file;    
    const [data, base64 ]= file.split(',')
    let path = '/home/dvo/docs/projects/baseAPI/src/uploads';
    const fileName = `photo_${v4()}`;
    const filExtension = data.slice(11, 14)
    const buffer = Buffer.from(base64, 'base64');
    
    fs.writeFile(`${path}/${fileName}.${filExtension}`, buffer, (err) => {
      if (err) {
        throw customError(StatusCodes.BAD_REQUEST, nameError.errorLoading, nameError.errorLoading)
      }
    })
    
    const user = await usersRepo.findOneBy({
      id: decoded.id,
    })
    
    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, nameError.userNotFound);
    } 
    if (user.photoFilePath) {
      const file = user.photoFilePath;
      fs.unlink(`${path}/${file}`, (err => {
        if (err) console.log(err);
      }));
    }

    user.photoFilePath = `${fileName}.${filExtension}`;
    await usersRepo.save(user);
    delete user.password;
    
    return res.status(StatusCodes.OK).json({
      user: user
    });
    
  } catch (err) {
    next(err)
  };
};

export default uploadUserPhoto;