/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Handler } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'yup';

import type { SchemaType, SchemaItemType } from '../validation/querySchemaType';
import handlerErrorsArray from '../utils/handlerErrorsArray';
import customError from '../customError/customError';
import errorMessages from '../utils/errorMessages';

const applyValidationScheme = (schema: SchemaType): Handler => async (req, res, next) => {
  try {
    const paramsType = Object.keys(schema);
    const queryFields = Object.keys(req.query);
    const bodyFields = Object.keys(req.body);

    const listOfFields = Object.values(schema).map((item) => {
      return Object.keys(item);
    });
    const extraFields: string[] = [];
    let extraQuery = '';

    switch (paramsType[0]) {
      case 'query':
        queryFields.forEach((item) => {
          if (!listOfFields[0].includes(item)) {
            extraFields.push(item);
          }
        });
        if (bodyFields.length) {
          extraQuery = 'Request.body';
        }
        break;
      case 'body':
        bodyFields.forEach((item) => {
          if (!listOfFields[0].includes(item)) {
            extraFields.push(item);
          }
        });
        if (queryFields.length) {
          extraQuery = 'Request.query';
        }
        break;
      default:
        extraQuery = '';
    }

    if (extraFields.length || extraQuery.length) {
      return next(customError(
        StatusCodes.BAD_REQUEST, `${errorMessages.extraParams}: ${extraFields.join(', ')} ${extraQuery}`, errorMessages.extraParams,
      ));
    }

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
        StatusCodes.PRECONDITION_FAILED, errorMessages.validationError, handlerErrorsArray(err),
      ));
    }
  }
};

export default applyValidationScheme;
