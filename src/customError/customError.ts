export class CustomError extends Error {
  localData: {
    status: number;
    message: string;
    payload?: object | string | number;
  };

  constructor(status: number, message: string, payload: object | string | number) {
    super(message);
    this.localData = { status, message, payload };
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

const customError = (status: number, message: string, payload: object | string | number) => {
  const error = new CustomError(status, message, payload);
  return error;
};

export default customError;
