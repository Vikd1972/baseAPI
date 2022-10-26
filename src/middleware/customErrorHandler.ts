import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import customError from '../customError/customError';

const customErrorHandler: ErrorRequestHandler = (err, req, res) => {
  if (err instanceof customError) {
    return res.json(err);
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Something went wrong. Please contact support.' });
};

export default customErrorHandler;
