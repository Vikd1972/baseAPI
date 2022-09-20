import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import customError from '../customError/customError';
import nameError from '../utils/utils';
import ErrObj from '../customError/validationError';

const validate = (schema: any) => async (request: Request, response: Response, next: NextFunction) => {
  
  try {
    await schema.validate(request.body, { abortEarly: false });    
    return next();
  } catch (err) {
    const validationError: ErrObj = [];        
    err.inner.forEach(element => {
      validationError.push({
        field: element.path,
        value: element.value,
        message: element.errors[0],
      });
    })
    throw customError(StatusCodes.PRECONDITION_FAILED, nameError.user_vd, validationError)
  }
};



export default validate