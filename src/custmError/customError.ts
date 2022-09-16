interface CustomError extends Error {
  localData: {
    status: number;
    message: string;
    payload: any;
  }
}

const customError = (status: number, message: string, payload: any) => {
  const error = new Error(message) as CustomError;
  error.localData = {
    status,
    message,
    payload,
  };
  return error;
};

export default customError;
