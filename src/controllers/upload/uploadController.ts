import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import usersRepo from "../../db";
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const uploadUserPhoto: Handler = async (req, res, next) => {
  try {
    const file = req.body;
    console.log(file);
    

  } catch (err) {
    next(err)
  };
};

export default uploadUserPhoto;