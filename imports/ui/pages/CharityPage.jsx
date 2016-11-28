import React from 'react'
import GoogleMap from '../components/GoogleMap'
import ContactCard from '../components/ContactCard'
import FinancialFacts from '../components/FinancialFacts'
import Trustees from '../components/Trustees'
import { parseAdressObject } from '../helpers/helpers';

export default class CharityPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const style = {
      border: "0",
      width: "100%",
      height: "100%"
    };

		console.log(this.props)    
    const { charData, loading } = this.props;
    // if (charData) console.log(charData.RegistrationHistory.RegistrationDate.toDateString());
    // if (charData) console.log(charData.GrossIncome);

    return (
      <ui className="ui stackable container grid">
					<div className="sixteen wide column">
						<div className="ui padded segment">
							<h1  className="ui header" >
						  	{charData === undefined ? "" : charData.CharityName === undefined ? "" : charData.CharityName}
						  	<div className="sub header">{charData === undefined ? "" : charData.Activities }</div>
						  </h1>
						</div>
					</div>
					<div className="ten wide column">
						{charData === undefined ? "" : charData.Address.Line1 === "" ? "" : <iframe src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyCeYDxojDuSv5WoqvAubgzIElDuknExNpI&q=" + parseAdressObject(charData.Address)} frameBorder="0" style = {style}></iframe>}
					</div>
					<div className="six wide column">
						{charData === undefined ? "" : <ContactCard contactData={charData}/>}
					
					</div>
					<div className="sixteen wide centered column">
						<h2 className="ui header">Fixed & Figures</h2>
						{charData === undefined ? "" :  isNaN(charData.GrossIncome) ? "" : <FinancialFacts financialData={charData}/>}	
					</div>
					<h2 className="ui header">Trustees</h2>
					{charData === undefined ? "" : charData.Trustees === null ? "" : <Trustees trusteesData={charData.Trustees}/>}	
			</ui>
    )
  }
}

// <GoogleMap key={charData.RegisteredCharityNumber} adressObj={charData.Address}/>}
;