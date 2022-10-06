import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import usersRepo from "../../db";
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const getUsers: Handler = async (req, res, next) => {
  try {    
    if (req.body.id) {
      const id = req.body.id;
      const user = await usersRepo.findOneBy({
        id: id,
      });
  
      if (!user) {
        throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, `id: ${id}`);
      } 
      return res.status(StatusCodes.OK).json({
        user: user
      });
    }

    const users = await usersRepo.find();        
    if (users.length === 0) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, 'no users in the database');
    }
  
    return res.status(StatusCodes.OK).json({
      users
    });
    
      
  } catch (err) {
    next(err)
  };
};

export default getUsers;