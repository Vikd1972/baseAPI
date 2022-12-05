import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../customError/customError';

const customErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof CustomError) {
    return res.status(err.localData.status).json(err.localData);
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Something went wrong. Please contact support.' });
};

export default customErrorHandler;
