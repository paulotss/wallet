import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLoginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      password: '',
      isValid: false,
    };
  }

  handleChange({ target }) {
    const name = target.type;
    const { value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const MAX_LENGTH = 5;
      const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/gi;
      this.setState((prevState) => ({
        isValid: prevState.email.match(regex) && prevState.password.length > MAX_LENGTH,
      }));
    });
  }

  handleClick() {
    const { userLogin } = this.props;
    const { email } = this.state;
    userLogin(email);
    const { history: { push } } = this.props;
    push('/carteira');
  }

  render() {
    const { email, password, isValid } = this.state;
    return (
      <div id="login-box">
        <h3>Login</h3>
        <form>
          <label htmlFor="email">
            Email:
            {' '}
            <input
              type="email"
              data-testid="email-input"
              id="email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="password">
            Senha:
            {' '}
            <input
              type="password"
              data-testid="password-input"
              value={ password }
              onChange={ this.handleChange }
              id="password"
            />
          </label>
          <button
            type="button"
            disabled={ !isValid }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  userLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(userLoginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
