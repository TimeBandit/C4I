import React from 'react'
import { currencyFormat } from '../helpers/helpers'

const Income = ({ data }) => {

  const grossIncome = data[data.length - 1].GrossIncome;
  
  const d = {
    // A labels array that can contain any sort of values
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
      [5, 2, 4, 2, 0]
    ]
  };

  const makeChart = () => {
  	new Chartist.Line('.ct-chart', d);
  }

  return (
    <div className="column">
			<div className="ui segment">
			  <div className="ui tiny statistic">
			    <div className="value">
			      {currencyFormat(grossIncome)}
			    </div>
			    <div className="label">
			      Income
			    </div>
			  </div>
			  <div className="ct-chart ct-perfect-fourth">
			  	{makeChart()}
			  </div>
	  	</div>
		</div>
  );
}

export default Income;
