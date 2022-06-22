export const LOGIN = 'LOGIN';

export const userLoginAction = (email) => (
  {
    type: LOGIN,
    payload: email,
  }
);
