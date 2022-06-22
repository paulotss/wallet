import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
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
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
