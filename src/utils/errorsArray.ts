import type * as yup from 'yup';

type ErrObjType = {
  field?: string;
  value: string;
  message: string;
};

const errorsArray = (err: yup.ValidationError) => {
  const errorsArray: ErrObjType[] = [];

  err.inner.forEach((element) => {
    const error: ErrObjType = {
      field: element.path,
      value: element.value as string,
      message: element.errors[0],
    };

    errorsArray.push(error);
  });

  return errorsArray;
};

export default errorsArray;
