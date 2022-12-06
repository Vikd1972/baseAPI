import * as yup from 'yup';

const schemaQueryString = {
  query: {
    page: yup.string(),
    search: yup.string(),
    genres: yup.string(),
    price: yup.string(),
    sort: yup.string(),
  },
};

export default schemaQueryString;
