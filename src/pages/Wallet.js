import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesThunk } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <>
        <header id="header">
          <div data-testid="email-field">{ email }</div>
          <div>
            Despesas totais:
            {' '}
            <span data-testid="total-field">0</span>
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
              type="text"
              id="valor"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            {' '}
            <input
              type="text"
              id="descricao"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            {' '}
            <select id="moeda">
              { currencies.map((cur) => <option key={ cur }>{ cur }</option>) }
            </select>
          </label>
          <label htmlFor="metodo">
            Forma:
            {' '}
            <select id="metodo" data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria:
            {' '}
            <select id="categoria" data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </section>
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrenciesThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
