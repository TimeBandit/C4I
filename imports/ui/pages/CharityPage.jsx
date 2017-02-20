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
    this.emailButton = this.emailButton.bind(this);
    this.websiteButton = this.websiteButton.bind(this);
  };

  emailButton(EmailAddress) {
    if (EmailAddress !== "") {
      return (
        <a href={"mailto:" + EmailAddress.toLowerCase()}>
			      <button className="ui labeled icon tiny green button">
						  <i className="mail icon"></i>
						  Email Them
						</button>	
		      </a>
      )
    }
    return "";
  };

  websiteButton(WebsiteAddress) {
    if (WebsiteAddress !== "") {
      return (
        <a href={"http://" + WebsiteAddress.toLowerCase()}>
	      	<button className="ui labeled icon tiny green button">
					  <i className="linkify icon"></i>
					  Visit Website
					</button>																      	
	      </a>
      )
    }
    return "";
  };

  render() {

    const style = {
      border: "0",
      width: "100%",
      height: "100%"
    };

    const humanizeText = {
      textTransform: 'capitalize'
    }

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

    const CharityName = charity.CharityName || "";
    const Address = charity.Address || "";
    const CharityRoleName = charity.ContactName.CharityRoleName.toLowerCase() || "";
    const { RegisteredCharityNumber = "-", RegisteredCompanyNumber = "-" } = charity;
    const { PublicTelephoneNumber = "", PublicFaxNumber = "", EmailAddress = "", WebsiteAddress = "" } = charity;

    // 
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
    // PEOPLE
    const { NoEmployees = 0, NoVolunteers = 0 } = charity.Returns[0].Employees;
    const numTrustees = charity.Trustees.length || 0;

    return (
      <span>
    		<div className="ui vertical basic segment charity-main">
        <div className="ui container">
            <div className="ui equal width stackable grid">
                <div className="ui stretched row">
                    <div className="eleven wide column">
                        <div className="ui basic segment test">
                            <div className="ui basic inverted segment">
                                <h1 className="ui inverted header">
                                {CharityName}                              
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui inverted segment charity-main-sidebar">
                            <div className="ui basic segment">
	                            	<div className="ui small inverted header">
		                            	<i className="info icon"></i>
		                            	CHARITY INFO
	                            	</div>
                                <div className="ui list address" style={humanizeText}>
                                    <div className="item">{Address.Line1 ? Address.Line1.toLowerCase() : ""}</div>
                                    <div className="item">{Address.Line2 ? Address.Line2.toLowerCase() : ""}</div>
                                    <div className="item">{Address.Line3 ? Address.Line3.toLowerCase() : ""}</div>
                                    <div className="item">{Address.Line4 ? Address.Line4.toLowerCase() : ""}</div>
                                    <div className="item">{Address.Line5 ? Address.Line5.toLowerCase() : ""}</div>
                                    <div className="item">{Address.Postcode ? Address.Postcode : ""}</div>
                                </div>
                                <div className="ui mini horizontal inverted statistic">
                                    <div className="value">
                                    </div>
                                    <div className="label">
                                        
                                    </div>
                                </div>
                                <div className="ui list contact">
																  <div className="item" style={humanizeText}>
																    <i className="user icon"></i>
																    <div className="content">
																      {CharityRoleName}
																    </div>
																  </div>
																  <div className="item">
																    <i className="phone icon"></i>
																    <div className="content">
																      {PublicTelephoneNumber}
																    </div>
																  </div>
																  <div className="item">
																    <i className="fax icon"></i>
																    <div className="content">
																      {PublicFaxNumber}
																    </div>
																  </div>
																  <div className="item">
																    <div className="content">
																    	{this.emailButton(EmailAddress)}
																    </div>
																  </div>
																  <div className="item">
																    <div className="content">
																    	{this.websiteButton(WebsiteAddress)}
																    </div>
																  </div>
																</div>
																<div className="ui mini horizontal inverted statistic">
                                    <div className="value">
                                    </div>
                                    <div className="label">
                                    </div>
                                </div>
																<div className="ui mini list numbers">
																	<div className="item">
																		<i className="info circle icon"></i>
																		<div className="content ">
																			Charity Number: {RegisteredCharityNumber}
																		</div>
																	</div>
																	<div className="item">
																		<i className="info circle icon"></i>
																			<div className="content">
																				Company Number: {RegisteredCompanyNumber}
																			</div>
																	</div>
																</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="ui vertical basic segment">
        <div className="ui container">
            <div className="ui equal width stackable grid">
                <div className="ui stretched row">
                    <div className="eleven wide column">
                        <div className="ui basic segment">
                            <h1 className="ui header overview">
                            Overview
                        </h1>
                            <div className="ui divided items">
                                <div className="item">
                                    <div className="content">
                                        <a className="header">Activities</a>
                                        <div className="description">
                                            Green Lane Masjid and Community Centre operates a mosque and an Islamic community centre on Green Lane, Small Heath in Birmingham.
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="content">
                                        <a className="header">What we do</a>
                                        <div className="description">
                                            <div className="ui list">
                                                <div className="item">
                                                    General charitable purposes
                                                </div>
                                                <div className="item">
                                                    Edducation/training
                                                </div>
                                                <div className="item">
                                                    The prevention or relief of poverty
                                                </div>
                                                <div className="item">
                                                    Overseas aid/famine relief
                                                </div>
                                                <div className="item">
                                                    Religious activities
                                                </div>
                                                <div className="item">
                                                    Amateur sport
                                                </div>
                                                <div className="item">
                                                    Economic/community development/employment
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="content">
                                        <a className="header">Who We Serve</a>
                                        <div className="description">
                                            <div className="ui list">
                                                <div className="item">
                                                    Children/young people
                                                </div>
                                                <div className="item">
                                                    Other charities or voluntary bodies
                                                </div>
                                                <div className="item">
                                                    The general public/mankind
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="content">
                                        <a className="header">How we work</a>
                                        <div className="description">
                                            <div className="ui list">
                                                <div className="item">
                                                    General charitable purposes
                                                </div>
                                                <div className="item">
                                                    Education/training
                                                </div>
                                                <div className="item">
                                                    The prevention or relief of poverty
                                                </div>
                                                <div className="item">
                                                    Overseas aid/famine relief
                                                </div>
                                                <div className="item">
                                                    Religious activities
                                                </div>
                                                <div className="item">
                                                    Amateur sport
                                                </div>
                                                <div className="item">
                                                    Economic/community development/employment
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui inverted segment charity-main-sidebar">
                            <div className="ui basic segment">
                                <div className="ui mini horizontal inverted statistic">
                                    <div className="value">
                                        🛐
                                    </div>
                                    <div className="label">
                                        area of benefit
                                    </div>
                                </div>
                                <div className="ui list benefit">
                                    <div className="item">
                                        Undefined, In practice, local
                                    </div>
                                </div>
                                <div className="ui inverted horizontal divider">
                                    🌙
                                </div>
                                <div className="ui mini horizontal inverted statistic">
                                    <div className="value">
                                        🗺
                                    </div>
                                    <div className="label">
                                        area of operation
                                    </div>
                                </div>
                                <div className="ui list operation">
                                    <div className="item">
                                        Birmingham City
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="ui vertical basic segment">
        <div className="ui container">
            <div className="ui equal width stackable grid">
                <div className="ui stretched row">
                    <div className="eleven wide column">
                        <div className="ui basic segment">
                            <h1 className="ui header overview">
                            Financials
                        </h1>
                            <div className="ui divided items">
                                <div className="item">
                                    <div className="image">
                                        <img src="/images/wireframe/image.png" />
                                    </div>
                                    <div className="content">
                                        <a className="header">Income</a>
                                        <div className="meta">
                                            <span>Income for the previous financial year</span>
                                        </div>
                                        <div className="description">
                                            <div className="ui list">
                                                <div className="item">🍲</div>
                                                <div className="item">🍔</div>
                                                <div className="item">🍔</div>
                                                <div className="item">🍔</div>
                                                <div className="item">🍔</div>
                                            </div>
                                        </div>
                                        <div className="extra">
                                            Additional Details
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="image">
                                        <img src="/images/wireframe/image.png" />
                                    </div>
                                    <div className="content">
                                        <a className="header">Spending</a>
                                        <div className="meta">
                                            <span>Spending for the previous financial year</span>
                                        </div>
                                        <div className="description">
                                            <p></p>
                                        </div>
                                        <div className="extra">
                                            Additional Details
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="image">
                                        <img src="/images/wireframe/image.png" />
                                    </div>
                                    <div className="content">
                                        <a className="header">Financial History</a>
                                        <div className="meta">
                                            <span>Histroical Income/Spending</span>
                                        </div>
                                        <div className="description">
                                            <p></p>
                                        </div>
                                        <div className="extra">
                                            Additional Details
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui inverted segment charity-main-sidebar">
                            <div className="ui basic segment">
                                <div className="ui mini horizontal inverted statistic">
                                    <div className="value">
                                        £24.87
                                    </div>
                                    <div className="label">
                                        ASSETS
                                    </div>
                                </div>
                                <br />
                                <div className="ui mini horizontal inverted statistic">
                                    <div className="value">
                                        0
                                    </div>
                                    <div className="label">
                                        invesments
                                    </div>
                                </div>
                                <br />
                                <div className="ui mini horizontal inverted statistic">
                                    <div className="value">
                                        0
                                    </div>
                                    <div className="label">
                                        pensions
                                    </div>
                                </div>
                                <br />
                                <div className="ui mini horizontal inverted statistic">
                                    <div className="value">
                                        £1.10M
                                    </div>
                                    <div className="label">
                                        other
                                    </div>
                                </div>
                                <br />
                                <div className="ui mini horizontal inverted statistic">
                                    <div className="value">
                                        £1.43
                                    </div>
                                    <div className="label">
                                        total
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="ui vertical basic segment">
        <div className="ui container">
            <div className="ui equal width stackable grid">
                <div className="ui stretched row">
                    <div className="eleven wide column">
                        <div className="ui basic segment">
                            <h1 className="ui header overview">
                            Governance
                        </h1>
                            <table className="ui stackable table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Trustee</th>
                                        <th className="right aligned">Holds Other Trusteeships</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Mr Mohammed Saeed</td>
                                        <td>236015</td>
                                        <td className="right aligned">Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Mr Mohammed Saeed</td>
                                        <td>236015</td>
                                        <td className="right aligned">Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Mr Mohammed Saeed</td>
                                        <td>236015</td>
                                        <td className="right aligned">Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Mr Mohammed Saeed</td>
                                        <td>236015</td>
                                        <td className="right aligned">Yes</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui inverted segment charity-main-sidebar">
                            <div className="ui basic segment">
                                <div className="ui mini horizontal inverted statistic">
                                    <div className="value">
                                        4
                                    </div>
                                    <div className="label">
                                        trustees
                                    </div>
                                </div>
                                <br />
                                <div className="ui mini horizontal inverted statistic">
                                    <div className="value">
                                        20
                                    </div>
                                    <div className="label">
                                        employees
                                    </div>
                                </div>
                                <br />
                                <div className="ui mini horizontal inverted statistic">
                                    <div className="value">
                                        0
                                    </div>
                                    <div className="label">
                                        volunteers
                                    </div>
                                </div>
                            </div>
                            <div className="ui inverted horizontal divider">
                                🌙
                            </div>
                            <div className="ui basic segment">
                                <div className="ui mini horizontal inverted statistic">
                                    <div className="value">
                                        📁
                                    </div>
                                    <div className="label">
                                        View Reports
                                    </div>
                                </div>
                                <div className="ui inverted middle aligned list reports">
                                    <div className="item">
                                        <div className="right floated content">
                                            <div className="ui basic vertical inverted animated button" tabIndex="0">
                                                <div className="hidden content">
                                                    <i className="down arrow icon"></i>
                                                </div>
                                                <div className="visible content">
                                                    Get it
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content">
                                            2015
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="right floated content">
                                            <div className="ui basic vertical inverted animated button" tabIndex="0">
                                                <div className="hidden content">
                                                    <i className="down arrow icon"></i>
                                                </div>
                                                <div className="visible content">
                                                    Get it
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content">
                                            2015
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="right floated content">
                                            <div className="ui basic vertical inverted animated button" tabIndex="0">
                                                <div className="hidden content">
                                                    <i className="down arrow icon"></i>
                                                </div>
                                                <div className="visible content">
                                                    Get it
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content">
                                            2015
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="right floated content">
                                            <div className="ui basic vertical inverted animated button" tabIndex="0">
                                                <div className="hidden content">
                                                    <i className="down arrow icon"></i>
                                                </div>
                                                <div className="visible content">
                                                    Get it
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content">
                                            2015
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    	</span>
    )
  }
};
