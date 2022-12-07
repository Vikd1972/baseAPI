/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
    const paramsFields = Object.keys(req.params);

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
        if (bodyFields.length || paramsFields.length) {
          extraQuery = 'Request.body or Request.params';
        }
        break;
      case 'body':
        bodyFields.forEach((item) => {
          if (!listOfFields[0].includes(item)) {
            extraFields.push(item);
          }
        });
        if (queryFields.length || paramsFields.length) {
          extraQuery = 'Request.query or Request.params';
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
