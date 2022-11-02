/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Handler } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'yup';

import type { SchemaType, SchemaItemType } from '../validation/querySchemaType';
import errorsArray from '../utils/errorsArray';
import customError from '../customError/customError';
import nameError from '../utils/utils';

const validate = (schema: SchemaType): Handler => async (req, res, next) => {
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
      { body: req.body, query: req.query, params: req.params },
      { abortEarly: false },
    );
    return next();
  } catch (err) {
    if (err instanceof ValidationError) {
      return next(customError(
        StatusCodes.PRECONDITION_FAILED, nameError.validationError, errorsArray(err),
      ));
    }
  }
};

export default validate;
