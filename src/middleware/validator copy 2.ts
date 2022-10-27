import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'yup';
import * as yup from 'yup';

import customError from '../customError/customError';
import nameError from '../utils/utils';
import type { SchemaItemType, SchemaType } from '../validation/querySchemaType';

type ErrObjType = {
  field?: string;
  value: string;
  message: string;
}[];

const validate =
  (schema: SchemaType): Handler => async (req, res, next) => {
    try {
      const currentSchema = yup.object().shape(
        Object.entries(schema).reduce((acc, [key, value]) => {
          return {
            ...acc,
            [key]: yup.object().shape(value),
          };
        }, {} as Record<string, yup.ObjectSchema<SchemaItemType>>),
      );

      await currentSchema.validate(
        { body: req.body, params: req.params, query: req.query }, { abortEarly: false },
      );
      return next();
    } catch (err) {
      if (err instanceof ValidationError) {
        const validationError: ErrObjType = [];
        return next(
          customError(StatusCodes.PRECONDITION_FAILED, nameError.validationError, validationError),
        );
      }
      return next(err);
    }
  };

export default validate;
