import React from 'react'
import GoogleMap from '../components/GoogleMap'
// import Trustees from '../components/Trustees'
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
/*---  Colors  ---*/
const red = "#FF695E";
const orange = "#FF851B";
const yellow = "#FFE21F";
const olive = "#D9E778";
const green = "#2ECC40";
const teal = "#6DFFFF";
const blue = "#54C8FF";
const violet = "#A291FB";
const purple = "#DC73FF";
const pink = "#FF8EDF";
const brown = "#D67C1C";
const grey = "#DCDDDE";
const black = "#545454";
const colours = [olive, green, teal, blue, violet, purple, pink];

const Trustees = function(props) {

  const trusteesCopy = props.trustees.slice(0);

  const isMale = function isMale({ TrusteeName }) {
    const honorific = TrusteeName.split(" ")[0].toLowerCase();
    if (honorific === "mr") {
      return true;
    } else {
      return false;
    };
  };

  const genderIconPath = function genderIconPath(obj) {
    const objcopy = Object.assign({}, obj);
    if (isMale(objcopy)) {
      return "../img/icons/musman.svg"
    } else {
      return "../img/icons/muswoman.svg"
    }
  };

  const Item = function Item({ name, number, path, count }) {
    return (
      <div className="item">
        <img className="ui avatar image" src={path} />
        <div className="content">
          <a className="header trustee-name">{name}</a>
          <div className="description">{`Trustee Number: ${number}`}</div>
          <div className="description">{`Other trusteeships: ${count}`}</div>
        </div>
      </div>
    )
  };

  const result = trusteesCopy.map(function(trusteeObject, index) {
    let { RelatedCharitiesCount, TrusteeName, TrusteeNumber } = trusteeObject;
    TrusteeName = TrusteeName.toLowerCase();
    const path = genderIconPath(trusteeObject);
    console.table[index, TrusteeName, path];
    return (
      <Item 
            key={index} 
            name={TrusteeName} 
            number={TrusteeNumber} 
            path={path} 
            count={RelatedCharitiesCount} 
        />
    )
  })

  return (
        <div className="ui relaxed list">
            {result}
        </div>
    )
}

const Test = function({ title, data, description, colours }) {

  let dataCopy = data.slice(0);

  const labels = data.map(val => val.FyEnd);

  const grossIncomeValues = data.map(val => parseInt(val.GrossIncome));
  const totalExpenditureValues = data.map(val => parseInt(val.TotalExpenditure));
  const netIncomeValues = grossIncomeValues.map((val, index) => val - totalExpenditureValues[index])

  const incomeColour = new Array(grossIncomeValues.length).fill("#54C8FF");
  const expenditureColour = new Array(totalExpenditureValues.length).fill("#FFE21F");
  const netIncomeColour = "#FF695E";

  const chartData = {
    labels: labels,
    datasets: [{
      type: 'bar',
      label: "Income",
      backgroundColor: incomeColour,
      borderColor: incomeColour,
      borderWidth: 1,
      data: grossIncomeValues,
    }, {
      type: 'bar',
      label: "Spending",
      backgroundColor: expenditureColour,
      borderColor: expenditureColour,
      borderWidth: 1,
      data: totalExpenditureValues,
    }, {
      type: 'bar',
      label: "Net Income",
      backgroundColor: netIncomeColour,
      borderColor: netIncomeColour,
      borderWidth: 1,
      data: netIncomeValues
    }]
  };

  const displayChart = function displayChart(dom) {
    const myChart = new Chart(dom, {
      type: 'bar',
      data: chartData,
      options: {
        legend: {
          display: true,
          position: 'bottom'
        },
        scales: {
          yAxes: [{
            ticks: {
              // Create scientific notation labels
              callback: function(value, index, values) {
                return currencyFormat(value);
              }
            }
          }],
          xAxes: [{
            ticks: {
              // Create scientific notation labels
              callback: function(value, index, values) {
                return new Date(value).getFullYear();
              }
            }
          }]
        }
      }
    });
  };

  const splitStingAtCapitals = function splitStingAtCapitals(string) {
    return string.match(/[A-Z][a-z]+/g);
  };

  const DisplayLegend = function DisplayLegend() {
    console.log(labels);
    return labels.map(function(label, index) {
      console.log(label);
      return (
        <div className="item legend-item" key={index}>
            <a className="ui empty circular
                label" style={{backgroundColor: colours[index]}}>
            </a>
                {`${splitStingAtCapitals(label).join(" ")}: ${currencyFormat(values[index])}`}
        </div>
      )
    })
  };

  if (data === {}) {
    return (<span></span>);
  }
  return (
    <div className="item">
        {/*<div className="ui small image">*/}
            {/*<canvas id="myChart" ref={displayChart} width="350" height="350"></canvas>*/}
                                           {/*  </div>*/}
        <div className="content">
            <a className="header">{title}</a>
            <div className="meta">
                <span>{description}</span>
            </div>
            <div className="description">
                <div className="ui fluid image">
                    <canvas id="myChart" ref={displayChart} width="66%"></canvas>
                </div>
            </div>
            <div className="extra">
                Additional Details
            </div>
        </div>
    </div>
  )
};

const Financial = function({ title, data, description, colours }) {

  let dataCopy = Object.assign({}, data);
  const total = parseInt(data.Total);
  delete dataCopy.Total;

  const labels = Object.keys(dataCopy);
  const values = Object.values(dataCopy).map(x => parseInt(x));
  // console.log(data, dataCopy, labels, values);

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

  const splitStingAtCapitals = function splitStingAtCapitals(string) {
    return string.match(/[A-Z][a-z]+/g);
  };

  const DisplayLegend = function DisplayLegend() {
    return labels.map(function(label, index) {
      return (
        <div className="item legend-item" key={index}>
            <a className="ui empty circular
                label" style={{backgroundColor: colours[index]}}>
            </a>
                {`${splitStingAtCapitals(label).join(" ")}: ${currencyFormat(values[index])}`}
        </div>
      )
    })
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
            <a className="header">{`${title}: ${currencyFormat(total)}`}</a>
            <div className="meta">
                <span>{description}</span>
            </div>
            <div className="description">
                <div className="ui divided selection list">
                    {DisplayLegend()}
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

    // var level3 = (((test || {}).level1 || {}).level2 || {}).level3;
    const CharityName = charity.CharityName || "";
    const Address = charity.Address || "";
    const CharityRoleName = charity.ContactName.CharityRoleName.toLowerCase() || "";
    const { RegisteredCharityNumber = "-", RegisteredCompanyNumber = "-" } = charity;
    const { PublicTelephoneNumber = "", PublicFaxNumber = "", EmailAddress = "", WebsiteAddress = "" } = charity;
    const { Activities, Classification } = charity;
    const { AreaOfBenefit } = charity;
    const { AreaOfOperation } = charity;
    const { Incoming = {} } = charity.Returns[0].Resources;
    const { Expended = {} } = charity.Returns[0].Resources;
    let { Funds = {} } = charity.Returns[0].AssetsAndLiabilities;
    Funds.Total = Funds.TotalFunds;
    delete Funds.TotalFunds;
    const { Submission = [] } = charity;
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

    /* declartions above this are new and with defaults, those below need reviewing */
    let upToDate = charity.LatestFiling.HasRecieveAnnualReturnForDue;
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
                                        <h1 className="ui inverted header masthead">
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
                                        <Financial 
                                            title={"Expenditure"} 
                                            data={Expended}
                                            description={"What money was spent on during the previous financial year"}
                                            colours={colours} 
                                        />
                                        <Financial 
                                            title={"Funds"} 
                                            data={Funds}
                                            description={"Funds"}
                                            colours={colours} 
                                        />
                                        <Test 
                                            title={"History"} 
                                            data={Submission}
                                            description={"Histroical Income v Spending"}
                                            colours={colours} 
                                        />
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
                                                    Own Use Assets: {currencyFormat(OwnUseAssets)}
                                                </div>
                                            </div>
                                            <div className="item">
                                                <i className="info circle icon"></i>
                                                <div className="content">
                                                    Long Term Investments: {currencyFormat(LongTermInvestments)}
                                                </div>
                                            </div>
                                            <div className="item">
                                                <i className="info circle icon"></i>
                                                <div className="content">
                                                    Pension Scheme Asset Liability: {currencyFormat(PensionSchemeAssetLiability)}
                                                </div>
                                            </div>
                                            <div className="item">
                                                <i className="info circle icon"></i>
                                                <div className="content">
                                                    Other Assets: {currencyFormat(OtherAssets)}
                                                </div>
                                            </div>
                                            <div className="item">
                                                <i className="info circle icon"></i>
                                                <div className="content">
                                                    Total Liability: {currencyFormat(TotalLiability)}
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
                                    Governance
                                </h1>
                                    <Trustees trustees={charity.Trustees} />
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
