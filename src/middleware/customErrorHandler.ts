import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const customErrorHandler: ErrorRequestHandler = (err, req, res, next) => {  
  if (err.localData) {
    return res.status(err.localData.status).json(err.localData);
  }  

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong. Please contact support.' });
};

export default customErrorHandler;