interface CustomError extends Error {
  localData: {
    status: number;
    message: string;
    payload: any;
  }
}

const foo = (status, message, payload): CustomError => {
  const customError = new Error(message) as CustomError;
  customError.localData = {
    status,
    message,
    payload
  }
  return customError
}


export default CustomError