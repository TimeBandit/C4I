import React from 'react'
import { currencyFormat } from '../helpers/helpers'

const Income = ({ financialData }) => {

  const { GrossIncome } = financialData;
  // console.log('bla');
  // console.log(typeof Employees);

  return (
    <div className="column">
			<div className="ui segment">
			  <div className="ui tiny statistic">
			    <div className="value">
			      {currencyFormat(GrossIncome)}
			    </div>
			    <div className="label">
			      Income
			    </div>
			  </div>
	  	</div>
		</div>
  );
}

export default Income;
