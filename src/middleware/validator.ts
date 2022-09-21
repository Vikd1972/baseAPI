import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'yup';

import customError from '../customError/customError';
import nameError from '../utils/utils';
import ErrObj from '../customError/validationError';

const validate = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {  
  try {
    await schema.validate(req.body, { abortEarly: false });    
    return next();
  } catch (err) {
    const validationError: ErrObj = [];  

    if (err !instanceof ValidationError) {
      throw customError(StatusCodes.PRECONDITION_FAILED, nameError.validationError, validationError)
    }

    err.inner.forEach(element => {
      validationError.push({
        field: element.path,
        value: element.value,
        message: element.errors[0],
      });
    })
  }
};

export default validate