import React from 'react'
import { currencyFormat } from '../helpers/helpers'
import TrusteeCard from './TrusteeCard'

const GoogleMap = ({ trusteesData }) => {

	const buildTrusteeCards = () => {
			return trusteesData.map(function (el, idx, arr) {
				return <TrusteeCard 
					key={idx} 
					name={el.TrusteeName} 
					number={el.TrusteeNumber} 
					relateCharities={el.RelatedCharitiesCount}
					/>
			})
	}

  return (
  	<div className="ui three stackable cards">
  		{trusteesData === undefined ? "" : buildTrusteeCards()}
  	</div>
  );
}

export default GoogleMap;