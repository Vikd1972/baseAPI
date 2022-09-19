import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import customError from '../customError/customError';
import nameError from '../utils/utils';

const validate = (schema: any) => async (request: Request, response: Response, next: NextFunction) => {
  
  try {
    await schema.validate(request.body, {abortEarly: false});    
    return next();
  } catch (err) {
    throw customError(StatusCodes.PRECONDITION_FAILED, nameError.user_vd, request.body)
  }
};

type ErrObj = {
  path: string; // body
  field: string; // password
  message: string; // Password 
  validationMessage: string; // 
}[]

export default validate