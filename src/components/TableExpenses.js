import React from 'react';
import PropTypes from 'prop-types';

class TableExpenses extends React.Component {
  render() {
    const { expenses, deleteClick, editClick } = this.props;
    return (
      <table className="table">
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
        <tbody>
          {
            expenses.map((exp) => (
              <tr key={ exp.id }>
                <td>{ exp.description }</td>
                <td>{ exp.tag }</td>
                <td>{ exp.method }</td>
                <td>{ Number(exp.value).toFixed(2) }</td>
                <td>{ exp.exchangeRates[exp.currency].name.split('/')[0] }</td>
                <td>{ Number(exp.exchangeRates[exp.currency].ask).toFixed(2) }</td>
                <td>
                  {
                    (Number(exp.value) * Number(exp.exchangeRates[exp.currency].ask))
                      .toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    name={ exp.id }
                    data-testid="edit-btn"
                    onClick={ editClick }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    name={ exp.id }
                    data-testid="delete-btn"
                    onClick={ deleteClick }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

TableExpenses.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  editClick: PropTypes.func.isRequired,
  deleteClick: PropTypes.func.isRequired,
};

export default TableExpenses;
