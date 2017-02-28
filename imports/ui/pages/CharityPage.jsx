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
import Chart from 'chart.js'
// colours
/*---  Colors  ---*/
const red    = "#DB2828";
const orange = "#F2711C";
const yellow = "#FBBD08";
const olive  = "#B5CC18";
const green  = "#21BA45";
const teal   = "#00B5AD";
const blue   = "#2185D0";
const violet = "#6435C9";
const purple = "#A333C8";
const pink   = "#E03997";
const brown  = "#A5673F";
const grey   = "#767676";
const black  = "#1B1C1D";
const colours = [olive, green, teal, blue, violet, purple, pink];

const Financial = function({ title, data, description, colours }) {

  let dataCopy = Object.assign({}, data);
  const total = parseInt(data.Total);
  delete dataCopy.Total;

  const labels = Object.keys(dataCopy);
  const values = Object.values(dataCopy).map(x => parseInt(x));
  console.log(data, dataCopy, labels, values);

  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Income',
      data: values,
      backgroundColor: colours,
      hoverBackgroundColor: colours
    }]
  };

  const displayChart = function displayChart(dom) {
    const myChart = new Chart(dom, {
      type: 'pie',
      data: chartData,
      options: {
        legend: {
          display: false,
          position: 'right'
        }
      }
    });
  };

  if (data === {}) {
    return (<span></span>);
  }
  return (
    <div className="item">
        <div className="ui small image">
            <canvas id="myChart" ref={displayChart} width="350" height="350"></canvas>
        </div>
        <div className="content">
            <a className="header">{title}</a>
            <div className="meta">
                <span>{description}</span>
            </div>
            <div className="description">
                <div className="ui divided selection list">
                    <div className="item legend-item">
                        <a className="ui empty circular label"></a>
                        Kumquats
                    </div>
                    <div className="item legend-item">
                        <a className="ui empty circular label"></a>
                        Kumquats
                    </div>
                </div>
            </div>
            <div className="extra">
                Additional Details
            </div>
        </div>
    </div>
  )
};


export default class CharityPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.emailButton = this.emailButton.bind(this);
    this.websiteButton = this.websiteButton.bind(this);
    this.whoWhatHow = this.whoWhatHow.bind(this);
  };

  emailButton(EmailAddress) {
    if (EmailAddress !== "") {
      return (
        <a href={"mailto:" + EmailAddress.toLowerCase()}>
                  <button className="ui labeled icon tiny green button">
                          <i className="mail icon"></i>
                          Email
                        </button>   
              </a>
      )
    }
    return "";
  };

  websiteButton(webAddress) {
    if (webAddress !== "") {
      return (
        <a href={"http://" + webAddress.toLowerCase()}>
            <button className="ui labeled icon tiny green button">
                      <i className="linkify icon"></i>
                      Website
                    </button>                                                                       
          </a>
      )
    }
    return "";
  };

  whoWhatHow(who) {

    const list = who.map(function(x, i, arr) {
      return (
        <div className="item" key={i}>
            {x[0].toUpperCase() + x.slice(1).toLowerCase()}
        </div>
      )
    });
    return (
      <div className="ui list">
        {list}
        </div>
    )
  };

  componentDidMount() {}
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
    const { Activities, Classification } = charity;
    const { AreaOfBenefit } = charity;
    const { AreaOfOperation } = charity;
    const { Incoming = {} } = charity.Returns[0].Resources;
    console.log('****', Incoming);
    /* declartions above this are new and with defaults, those below need reviewing */
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
                                                    {Activities}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="content">
                                                <a className="header">Who We Serve</a>
                                                <div className="description">
                                                    {this.whoWhatHow(Classification.Who)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="content">
                                                <a className="header">What we do</a>
                                                <div className="description">
                                                        {this.whoWhatHow(Classification.What)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="content">
                                                <a className="header">How we work</a>
                                                <div className="description">
                                                    {this.whoWhatHow(Classification.How)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="ui inverted segment charity-main-sidebar">
                                    <div className="ui basic segment">
                                        <div className="ui mini list numbers">
                                            <div className="item">
                                                <i className="info circle icon"></i>
                                                <div className="content ">
                                                    Area Of Benefit: {AreaOfBenefit[0] + AreaOfBenefit.slice(1).toLowerCase()}
                                                </div>
                                            </div>
                                            <div className="item">
                                                <i className="info circle icon"></i>
                                                <div className="content">
                                                    Area Of Operation: {AreaOfOperation.map((x) => {return x[0] + x.slice(1).toLowerCase()}).join(', ')}
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
                                    Financials
                                </h1>
                                    
                                    <div className="ui divided items">
                                        <Financial 
                                            title={"Income"} 
                                            data={Incoming}
                                            description={"Income for the previous financial year"}
                                            colours={colours} 
                                        />
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
