import type * as yup from 'yup';

type CustomErrorType = {
  field?: string;
  value: string;
  message: string;
};

const handlerErrorsArray = (err: yup.ValidationError) => {
  let errorsArray: CustomErrorType[] = [];

  errorsArray = err.inner.map((element) => {
    const error: CustomErrorType = {
      field: element.path,
      value: element.value as string,
      message: element.errors[0],
    };
    return error;
  });

  return errorsArray;
};

export default handlerErrorsArray;
