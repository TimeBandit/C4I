import React from 'react'
import { currencyFormat } from '../helpers/helpers'

const Numbers = ({ data }) => {

  const { RegisteredCharityNumber } = data;
  // console.log('bla');
  // console.log(typeof Employees);

  return (
    <div className="column">
			<div className="ui segment">
			  <div className="ui tiny statistic">
			    <div className="value">
			      {RegisteredCharityNumber}
			    </div>
			    <div className="label">
			      Charity Number
			    </div>
			  </div>
	  	</div>
	  	<div className="ui segment">
			  <div className="ui tiny statistic">
			    <div className="value">
			      xxxx
			    </div>
			    <div className="label">
			      Company Number
			    </div>
			  </div>
	  	</div>
		</div>
  );
}

export default Numbers;
