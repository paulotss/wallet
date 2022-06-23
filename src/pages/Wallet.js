import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesThunk, addExpenseThunk } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
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

  handleClick() {
    const { addExpense } = this.props;
    addExpense(this.state);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
    }));
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <>
        <header id="header">
          <div data-testid="email-field">{ email }</div>
          <div>
            Despesas totais:
            {' '}
            <span data-testid="total-field">
              { expenses.toFixed(2) }
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
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </section>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
        </table>
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.instanceOf(Array).isRequired,
  expenses: PropTypes.number.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses.reduce(
    (acc, exp) => acc + exp.value * Number(exp.exchangeRates[exp.currency].ask), 0,
  ),
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrenciesThunk()),
  addExpense: (expense) => dispatch(addExpenseThunk(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
