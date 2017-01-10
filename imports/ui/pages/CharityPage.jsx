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
import UIStatistic from '../components/UIStatistic'
import FinancialHistory from '../components/FinancialHistory'
import PublishedReports from '../components/PublishedReports';

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

    let { RegisteredCharityNumber, RegisteredCompanyNumber } = charity;
    let { PublicTelephoneNumber, PublicFaxNumber, EmailAddress, WebsiteAddress } = charity;
    let upToDate = charity.LatestFiling.HasRecieveAnnualReturnForDue;
    // ASSETS
    const assets = charity.Returns[0].AssetsAndLiabilities.Assets;
    const {
      TotalFixedAssets,
      FixedAssetInvestments,
      PensionFundAssets,
      TotalCurrentAssets,
      CreditorsDueWithinOneYear,
      LongTermCreditors
    } = assets;
    const OwnUseAssets = TotalFixedAssets + FixedAssetInvestments;
    const LongTermInvestments = FixedAssetInvestments;
    const PensionSchemeAssetLiability = PensionFundAssets;
    const OtherAssets = TotalCurrentAssets;
    const TotalLiability = CreditorsDueWithinOneYear + LongTermCreditors;
    // 

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
			  		<div className="column">
							<Income data={charity.Submission} chartData={charity.Returns[0].Resources.Incoming}/>
			  		</div>
			  	</div>
			  	<div className="stretched row">
			  		<div className="column">
			  			<Spending data={charity.Submission} chartData={charity.Returns[0].Resources.Expended}/>
			  		</div>
			  	</div>
		  		<div className="stretched row">
			      <div className="column">
			        <UIStatistic value={OwnUseAssets} label={"Own Use Assets"}/>
			      </div>
			      <div className="column">
			        <UIStatistic value={LongTermInvestments} label={"Long Term Investments"}/>
			      </div>
			      <div className="column">
			        <UIStatistic value={PensionSchemeAssetLiability} label={"Pension Scheme Asset/Liability"}/>
			      </div>
			      <div className="column">
			        <UIStatistic value={OtherAssets} label={"Other Assets"}/>
			      </div>
			      <div className="column">
			        <UIStatistic value={TotalLiability} label={"Total Liability"}/>
			      </div>
			    </div>
			    <div className="stretched row">
			    	<div className="colum">
			    		<UIStatistic value={OwnUseAssets} label={"Own Use Assets"}/>
			    	</div>
			    	<div className="colum">
			    		<UIStatistic value={OwnUseAssets} label={"Own Use Assets"}/>
			    	</div>
			    	<div className="colum">
			    		<UIStatistic value={OwnUseAssets} label={"Own Use Assets"}/>
			    	</div>
			    </div>
			  	<div className="stretched row">
			  		<div className="column">
			  			<div className="ui segment">
			  				<FinancialHistory data={charity.Submission}/>
			  			</div>
			  		</div>
			  	</div>
			  	<div className="stretched row">
			  		<div className="column">
			  			<PublishedReports data={charity.AccountListing}/>
			  		</div>
			  	</div>
			  	<div className="stretched row">
			  		<div className="column">
			  			<Trustees data={charity.Trustees} />
			  		</div>
			  		{/*<div className="column">
			  					  			<div className="ui segment">Employees</div>
			  					  		</div>
			  					  		<div className="column">
			  					  			<div className="ui segment">Volunteers</div>
			  					  		</div>*/}
			  	</div>
			  	<div className="stretched row">
			  		<div className="column">
		  				
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
