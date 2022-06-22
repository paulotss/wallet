export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const userLoginAction = (email) => (
  {
    type: LOGIN,
    payload: email,
  }
);

const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const getCurrenciesThunk = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();
  const currenciesArr = Object.keys(currencies).filter((val) => val !== 'USDT');
  dispatch(getCurrencies(currenciesArr));
};
