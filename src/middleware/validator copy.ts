import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'yup';
import { QuerySchemaLoginType, QuerySchemaUserType } from '../validation/querySchemaType';
import type { SchemaItemType, SchemaType } from '../validation/querySchemaType';


import customError from '../customError/customError';
import nameError from '../utils/utils';

type ErrObjType = {
  field?: string,
  value: string,
  message: string,
}[];

type ElementType = {
  path: string,
  value: string,
  errors: string[]
};

const validate = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    return next();

  } catch (err) {
    if (!(err instanceof ValidationError)) {
      next();
    };

    const validationError: ErrObjType = [];

    err.inner.forEach((element: ElementType) => {
      validationError.push({
        field: element.path,
        value: element.value,
        message: element.errors[0],
      });
    });
    next(customError(StatusCodes.PRECONDITION_FAILED, nameError.validationError, validationError)),      
  };
};

export default validate;
