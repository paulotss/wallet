import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrenciesThunk,
  addExpenseThunk,
  deleteExpenseAction,
  editExpenseAction,
} from '../actions';
import TableExpenses from '../components/TableExpenses';
import TAG from '../consts';

class Wallet extends React.Component {
  constructor() {
    super();
    this.hClick = this.hClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.editClick = this.editClick.bind(this);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: TAG,
      isEdit: false,
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  hClick() {
    const { isEdit } = this.state;
    if (isEdit) {
      const { expenses, editExpense } = this.props;
      editExpense(this.state);
      const lastExpense = expenses[expenses.length - 1];
      this.setState({
        id: lastExpense.id + 1,
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: TAG,
        isEdit: false,
      });
    } else {
      const { addExpense } = this.props;
      const { id, value, description, currency, method, tag } = this.state;
      addExpense({ id, value, description, currency, method, tag });
      this.setState((prevState) => ({
        id: prevState.id + 1,
        value: 0,
      }));
    }
  }

  deleteClick({ target: { name } }) {
    const { deleteExpense } = this.props;
    deleteExpense(Number(name));
  }

  editClick({ target: { name } }) {
    const id = Number(name);
    const { expenses } = this.props;
    console.log(expenses);
    const edit = expenses.find((exp) => exp.id === id);
    console.log(edit);
    this.setState({
      id,
      value: Number(edit.value),
      description: edit.description,
      currency: edit.currency,
      method: edit.method,
      tag: edit.tag,
      isEdit: true,
    });
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value, description, currency, method, tag, isEdit } = this.state;
    return (
      <>
        <header id="header">
          <div data-testid="email-field">{ email }</div>
          <div>
            Despesas totais:
            {' '}
            <span data-testid="total-field">
              {
                expenses.reduce(
                  (acc, exp) => (
                    acc + exp.value * Number(exp.exchangeRates[exp.currency].ask)
                  ), 0,
                ).toFixed(2)
              }
            </span>
          </div>
          <div>
            Câmbio:
            {' '}
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <section id="registration-form">
          <label htmlFor="valor">
            Valor:
            {' '}
            <input
              type="number"
              id="valor"
              name="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            {' '}
            <input
              type="text"
              id="descricao"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            {' '}
            <select
              id="moeda"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((cur) => <option key={ cur }>{ cur }</option>) }
            </select>
          </label>
          <label htmlFor="metodo">
            Forma:
            {' '}
            <select
              id="metodo"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria:
            {' '}
            <select
              id="categoria"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>{ TAG }</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          {
            isEdit
              ? <button type="button" onClick={ this.hClick }>Editar despesa</button>
              : <button type="button" onClick={ this.hClick }>Adicionar despesa</button>
          }
        </section>
        <TableExpenses
          expenses={ expenses }
          editClick={ this.editClick }
          deleteClick={ this.deleteClick }
        />
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.instanceOf(Array).isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrenciesThunk()),
  addExpense: (expense) => dispatch(addExpenseThunk(expense)),
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
  editExpense: (expense) => dispatch(editExpenseAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
