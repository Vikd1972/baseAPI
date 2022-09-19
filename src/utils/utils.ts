interface NameError {
  user_ua: string,
  user_nf: string,
  user_pw: string,
  user_pf: string,
  user_vd: string,
}

const nameError: NameError = {
  user_ua: 'token not found',
  user_pw: 'password is wrong',
  user_nf: 'user not found',
  user_pf: 'one or more fields are empty',
  user_vd: 'data validation error',
};

export default nameError;