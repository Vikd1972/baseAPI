import * as yup from 'yup';

const schemaUploadPhoto = {
  body: {
    userPhoto: yup.string().required(),
  },
};

export default schemaUploadPhoto;
