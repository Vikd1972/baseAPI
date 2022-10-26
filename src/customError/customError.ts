type ErrorPayloadType<P> = {
  status: number;
  message: string;
  payload: P;
};

class CustomError<P> extends Error {
  localData: ErrorPayloadType<P>;

  constructor(data: ErrorPayloadType<P>) {
    super('Custom error');
    this.localData = data;
  }
}

const customError = <P = object>(status: number, message: string, payload: P) => {
  const error = new CustomError({ status, message, payload });
  return error;
};

export default customError;
