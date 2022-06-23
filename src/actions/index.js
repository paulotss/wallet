export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

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

const addExpenseAction = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const getCurrenciesThunk = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();
  const currenciesArr = Object.keys(currencies).filter((val) => val !== 'USDT');
  dispatch(getCurrencies(currenciesArr));
};

export const addExpenseThunk = (expense) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();
  const result = {
    ...expense,
    exchangeRates: currencies,
  };
  dispatch(addExpenseAction(result));
};
