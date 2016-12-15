import React from 'react'
import GoogleMap from '../components/GoogleMap'
import Trustees from '../components/Trustees'
import { parseAdressObject, currencyFormat } from '../helpers/helpers'
import Income from '../components/Income';
import Spending from '../components/Spending';
import Numbers from '../components/Numbers';
import ContactList from '../components/ContactList';
import Address from '../components/Address';
import Activities from '../components/Activities';

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
      <div className="ui equal width stackable vertically divided grid container">
	      	<div className="center aligned row">
			  		<div className="column">
			  			<div className="ui segment">
			  				<h1  className="ui header" >
				 			  	{charData === undefined ? "" : charData.CharityName === undefined ? "" : charData.CharityName}
				 			  	
				 			  </h1>
			  			</div>
			  		</div>
			  	</div>
			  	<div className="stretched row">			  		
						{charData === undefined ? <div className="ui active loader">Loading</div> :  isNaN(charData.GrossIncome) ? "" : <Income financialData={charData}/>}
						{charData === undefined ? <div className="ui active loader">Loading</div> :  isNaN(charData.GrossIncome) ? "" : <Spending financialData={charData}/>}
			  		<div className="column">
			  			<div className="ui segment">Status</div>
			  		</div>
			  	</div>
			  	<div className="stretched row">
			  		{charData === undefined ? <div className="ui active loader">Loading</div> :  isNaN(charData.GrossIncome) ? "" : <Numbers data={charData}/>}
			  		{charData === undefined ? <div className="ui active loader">Loading</div> :  isNaN(charData.GrossIncome) ? "" : <ContactList data={charData}/>}
			  		{charData === undefined ? <div className="ui active loader">Loading</div> :  isNaN(charData.GrossIncome) ? "" : <Address data={charData.Address}/>}
			  	</div>
			  	<div className="row">
			  		{charData === undefined ? <div className="ui active loader">Loading</div> :  isNaN(charData.GrossIncome) ? "" : <Activities data={charData.Activities}/>}
			  	</div>
			  	<div className="row">
			  		<div className="column">
			  			<div className="ui segment">What</div>
			  		</div>
			  		<div className="column">
			  			<div className="ui segment">Who</div>
			  		</div>			  		
			  		<div className="column">
			  			<div className="ui segment">How</div>
			  		</div>
			  	</div>
			  </div>
    )
  }
}

// <GoogleMap key={charData.RegisteredCharityNumber} adressObj={charData.Address}/>}
//    <ui className="ui stackable container grid">
// 		<div className="sixteen wide column">
// 			<div className="ui padded segment">
// 				<h1  className="ui header" >
// 			  	{charData === undefined ? "" : charData.CharityName === undefined ? "" : charData.CharityName}
// 			  	<div className="sub header">{charData === undefined ? "" : charData.Activities }</div>
// 			  </h1>
// 			</div>
// 		</div>
// 		<div className="ten wide column">
// 			{charData === undefined ? "" : charData.Address.Line1 === "" ? "" : <iframe src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyCeYDxojDuSv5WoqvAubgzIElDuknExNpI&q=" + parseAdressObject(charData.Address)} frameBorder="0" style = {style}></iframe>}
// 		</div>
// 		<div className="six wide column">
// 			{charData === undefined ? "" : <ContactCard contactData={charData}/>}

// 		</div>
// 		<div className="sixteen wide centered column">
// 			<h2 className="ui header">Fixed & Figures</h2>
// 			{charData === undefined ? "" :  isNaN(charData.GrossIncome) ? "" : <FinancialFacts financialData={charData}/>}	
// 		</div>
// 		<h2 className="ui header">Trustees</h2>
// 		{charData === undefined ? "" : charData.Trustees === null ? "" : <Trustees trusteesData={charData.Trustees}/>}	
// </ui>
;
