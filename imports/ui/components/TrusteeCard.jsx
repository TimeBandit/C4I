import React from 'react'
import { currencyFormat } from '../helpers/helpers'

const GoogleMap = ({ name, number, relateCharities }) => {


  return (
  	<div className="ui card">
		  <div className="content">
		  	<i className=" right floated user icon"></i>
		    <a className="header">{name}</a>
		    <div className="meta">
		      <span className="date">Trustee number: {number}</span>
		    </div>
		    <div className="description">
		      This trusstee is also  a trustee of {relateCharities} other charities
		    </div>
		  </div>
		</div>
  );
}

export default GoogleMap;