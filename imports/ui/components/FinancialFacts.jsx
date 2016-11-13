import React from 'react'
import { currencyFormat } from '../helpers/helpers'

const GoogleMap = ({ financialData }) => {

  const { GrossIncome, TotalExpenditure, Employees, Volunteers } = financialData;
  // console.log('bla');
  // console.log(typeof Employees);

  return (
  	<div className="ui tiny statistics">
		  <div className="statistic">
		    <div className="value">
		      {currencyFormat(GrossIncome)}
		    </div>
		    <div className="label">
		      Gross Income
		    </div>
		  </div>
		  <div className="statistic">
		    <div className="value">
		      {currencyFormat(TotalExpenditure)}
		    </div>
		    <div className="label">
		      Total Expenditure
		    </div>
		  </div>
		  <div className="statistic">
		    <div className="value">
		      {Employees === "" ? 0 : Employees}
		    </div>
		    <div className="label">
		      # Employees
		    </div>
		  </div>
		  <div className="statistic">
		    <div className="value">
		      {Volunteers === "" ? 0 : Volunteers}
		    </div>
		    <div className="label">
		      # Volunteers
		    </div>
		  </div>
		</div>
  );
}

export default GoogleMap;