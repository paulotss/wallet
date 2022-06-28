import { GET_CURRENCIES, ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.payload),
    };
  case EDIT_EXPENSE: {
    const index = state.expenses.findIndex((val) => val.id === action.payload.id);
    state.expenses[index].value = action.payload.value;
    state.expenses[index].description = action.payload.description;
    state.expenses[index].currency = action.payload.currency;
    state.expenses[index].method = action.payload.method;
    state.expenses[index].tag = action.payload.tag;
    return { ...state };
  }
  default:
    return state;
  }
};

export default walletReducer;
