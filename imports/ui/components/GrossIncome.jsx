import React from 'react'
import { currencyFormat } from '../helpers/helpers'

const GrossIncome = ({ financialData }) => {

  const { GrossIncome } = financialData;
  // console.log('bla');
  // console.log(typeof Employees);

  return (
	  <div className="statistic">
	    <div className="value">
	      {currencyFormat(GrossIncome)}
	    </div>
	    <div className="label">
	      Gross Income
	    </div>
	  </div>
  );
}

export default GrossIncome;