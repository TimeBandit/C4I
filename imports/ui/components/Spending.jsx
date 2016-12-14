import React from 'react'
import { currencyFormat } from '../helpers/helpers'

const Spending = ({ financialData }) => {

  const { TotalExpenditure } = financialData;
  // console.log('bla');
  // console.log(typeof Employees);

  return (
    <div className="column">
			<div className="ui segment">
			  <div className="ui tiny statistic">
			    <div className="value">
			      {currencyFormat(TotalExpenditure)}
			    </div>
			    <div className="label">
			      Spending
			    </div>
			  </div>
	  	</div>
		</div>
  );
}

export default Spending;
