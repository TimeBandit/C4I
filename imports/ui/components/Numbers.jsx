import React from 'react'
import { currencyFormat } from '../helpers/helpers'

const Numbers = ({ RegisteredCharityNumber, RegisteredCompanyNumber }) => {
  
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
			      {RegisteredCompanyNumber}
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
