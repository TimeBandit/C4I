import React from 'react'
import GoogleMap from '../components/GoogleMap'
import Trustees from '../components/Trustees'
import { parseAdressObject, currencyFormat } from '../helpers/helpers'
import Income from '../components/Income';
import Spending from '../components/Spending';
import Numbers from '../components/Numbers';
import ContactList from '../components/ContactList';
import Address from '../components/Address';
import What from '../components/What';
import Who from '../components/Who';
import How from '../components/How';
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
    const { charity, loading } = this.props;
    
    if (loading) {
    	return (
    			<div className="ui equal width stackable vertically divided grid container">
		      	<div className="center aligned row">
				  		<div className="column">
			    			<div className="ui active loader">Loading</div>
			    		</div>
			    	</div>
			    </div>
    		)
    }

    let { RegisteredCharityNumber, RegisteredCompanyNumber} = charity;
    let { PublicTelephoneNumber, PublicFaxNumber, EmailAddress, WebsiteAddress } = charity;
    let upToDate = charity.LatestFiling.HasRecieveAnnualReturnForDue;

    return (
      <div className="ui equal width stackable vertically divided grid container">
	      	<div className="center aligned row">
			  		<div className="column">
			  			<div className="ui segment">
			  				<h1  className="ui header" >
				 			  	{charity.CharityName}				 			  	
				 			  </h1>
				 			  <div className={upToDate ? "ui bottom right attached green label" : "ui bottom right attached grey label"}>
				 			  	{ upToDate ? "Up-to-date" : "Out-of-date"}
				 			  </div>
			  			</div>
			  		</div>
			  	</div>
			  	<div className="stretched row">
			  		<Numbers RegisteredCharityNumber={RegisteredCharityNumber} RegisteredCompanyNumber={RegisteredCompanyNumber}/>
			  		<Address data={charity.Address}/>
			  		<ContactList PublicTelephoneNumber={PublicTelephoneNumber} PublicFaxNumber={PublicFaxNumber} EmailAddress={EmailAddress} WebsiteAddress={WebsiteAddress}/>
			  	</div>
			  	<div className="row">
			  		{<Activities data={charity.Activities}/>}
			  	</div>
			  	<div className="row">
	  				<What data={charity.Classification.What}/>
	  				<Who data={charity.Classification.Who}/>
	  				<How data={charity.Classification.How}/>
			  	</div>
			  	<div className="stretched row">
						<Income data={charity.Submission} chartData={charity.Returns[0].Resources.Incoming}/>
						{/*<Spending data={charity.Submission/>*/}
			  	</div>
			  	<div className="stretched row">
			  		<div className="column">
			  			<div className="ui segment">Income Chart</div>
			  		</div>
			  		<div className="column">
			  			<div className="ui segment">Spending Chart</div>
			  		</div>
			  	</div>
			  	<div className="stretched row">
			  		<div className="column">
			  			<div className="ui segment">Own Use</div>
			  		</div>
			  		<div className="column">
			  			<div className="ui segment">Long Term Investments</div>
			  		</div>			  		
			  		<div className="column">
			  			<div className="ui segment">Defined Benefit Pension Scheme Asset Or Liability</div>
			  		</div>
			  		<div className="column">
			  			<div className="ui segment">Other Assets</div>
			  		</div>
			  		<div className="column">
			  			<div className="ui segment">Total Liabilities</div>
			  		</div>
			  	</div>
			  	<div className="stretched row">
			  		<div className="column">
			  			<div className="ui segment">Financial History</div>
			  		</div>
			  		<div className="column">
			  			<div className="ui segment">Compliance History</div>
			  		</div>
			  	</div>
			  	<div className="stretched row">
			  		<div className="column">
			  			<div className="ui segment">Published Reports</div>
			  		</div>
			  	</div>
			  	<div className="stretched row">
			  		<div className="column">
			  			<div className="ui segment">Trustees</div>
			  		</div>
			  		<div className="column">
			  			<div className="ui segment">Employees</div>
			  		</div>
			  		<div className="column">
			  			<div className="ui segment">Volunteers</div>
			  		</div>
			  	</div>
			  	<div className="stretched row">
			  		<div className="column">
		  				<h3 className="ui top attached header">
		  					Trustees
		  				</h3>
			  			<div className="ui attached segment">
						  	<table className="ui very basic table">
								  <thead>
								    <tr>
								      <th>Name</th>
								      <th>Other Trusteeships</th>
								      <th>Charity Status</th>
								    </tr>
								  </thead>
								  <tbody>
								    <tr>
								      <td>John</td>
								      <td>Approved</td>
								      <td>None</td>
								    </tr>
								    <tr>
								      <td>Jamie</td>
								      <td>Approved</td>
								      <td>Requires call</td>
								    </tr>
								    <tr>
								      <td>Jill</td>
								      <td>Denied</td>
								      <td>None</td>
								    </tr>
								  </tbody>
								</table>
			  			</div>
			  		</div>
			  	</div>
			  </div>
    )
  }
}

// <GoogleMap key={charity.RegisteredCharityNumber} adressObj={charity.Address}/>}
//    <ui className="ui stackable container grid">
// 		<div className="sixteen wide column">
// 			<div className="ui padded segment">
// 				<h1  className="ui header" >
// 			  	{charity === undefined ? "" : charity.CharityName === undefined ? "" : charity.CharityName}
// 			  	<div className="sub header">{charity === undefined ? "" : charity.Activities }</div>
// 			  </h1>
// 			</div>
// 		</div>
// 		<div className="ten wide column">
// 			{charity === undefined ? "" : charity.Address.Line1 === "" ? "" : <iframe src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyCeYDxojDuSv5WoqvAubgzIElDuknExNpI&q=" + parseAdressObject(charity.Address)} frameBorder="0" style = {style}></iframe>}
// 		</div>
// 		<div className="six wide column">
// 			{charity === undefined ? "" : <ContactCard contactData={charity}/>}

// 		</div>
// 		<div className="sixteen wide centered column">
// 			<h2 className="ui header">Fixed & Figures</h2>
// 			{charity === undefined ? "" :  isNaN(charity.GrossIncome) ? "" : <FinancialFacts financialData={charity}/>}	
// 		</div>
// 		<h2 className="ui header">Trustees</h2>
// 		{charity === undefined ? "" : charity.Trustees === null ? "" : <Trustees trusteesData={charity.Trustees}/>}	
// </ui>
;
