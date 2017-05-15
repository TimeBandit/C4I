import React, { Component } from 'react';
import { parseAdressObject, currencyFormat } from '../helpers/helpers';
import Chart from 'chart.js';
import Loader from '../components/Loader';
import ReactDisqusComments from 'react-disqus-comments';
// var ReactDisqusComments = require('react-disqus-comments');
// console.log(ReactDisqusComments);
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

const NoData = function NoData({ text }) {
  return (
    <div className="ui large yellow label">
        {text}
    </div>
  );
};

const CharityReports = function CharityReports({ accountListing }) {

  const Item = function Item({ listing }) {

    const { AccountPeriodYearEndDate, HyperlinkReference } = listing;
    const baseUrl = "http://apps.charitycommission.gov.uk";
    return (
      <a className="item" href= {baseUrl + HyperlinkReference}>
        <i className="file icon"></i>
        <div className="content">
          <div className="header">{AccountPeriodYearEndDate}</div>
          <div className="description"></div>
        </div>
      </a>
    )
  }

  const items = accountListing.map(function(listing, index) {
    return (<Item listing={listing} key={index} />)
  })
  return (
    <div className="ui inverted middle aligned list reports">
        {items}
    </div>
  )
};

const Trustees = function Trustees(props) {

  const trusteesCopy = props.trustees.slice(0);

  const isMale = function isMale({ TrusteeName }) {
    if (TrusteeName.toLowerCase().match(/^(mrs|miss|ms)/)) {
      return false;
    } else {
      return true;
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

class Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { title, data, description, colours } = this.props;
    this.title = title, this.description = description;
    let dataCopy = data.slice(0);
    this.labels = dataCopy.map(val => val.FyEnd);

    const grossIncomeValues = dataCopy.map(val => parseInt(val.GrossIncome));
    const totalExpenditureValues = dataCopy.map(val => parseInt(val.TotalExpenditure));
    const netIncomeValues = grossIncomeValues.map((val, index) => val - totalExpenditureValues[index])

    const incomeColour = new Array(grossIncomeValues.length).fill("#54C8FF");
    const expenditureColour = new Array(totalExpenditureValues.length).fill("#FFE21F");
    const netIncomeColour = "#FF695E";

    this.chartData = {
      labels: this.labels,
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
  };

  componentDidMount() {
    const self = this;
    const displayChart = function displayChart() {
      const myChart = new Chart(self.submissionChart, {
        type: 'bar',
        data: self.chartData,
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
    displayChart(this.submissionChart);
  };

  componentWillUnmount() {
    $(this.submissionChart).remove();
  };


  render() {

    if (this.labels.length === 0) {
      return (<span></span>);
    }

    return (
      <div className="item">
        <div className="content">
          <a className="header">{this.title}</a>
          <div className="meta">
              <span>{this.description}</span>
          </div>
          <div className="description">
              <div className="ui fluid image">
                  <canvas id="myChart" className="history" ref={(input) => { this.submissionChart = input; }} width="66%"></canvas>
              </div>
          </div>
          <div className="extra">
              Additional Details
          </div>
        </div>
      </div>
    )
  };
};

class Financial extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.splitStingAtCapitals = this.splitStingAtCapitals.bind(this);
    this.displayLegend = this.displayLegend.bind(this);
  };

  splitStingAtCapitals(string) {
    return string.match(/[A-Z][a-z]+/g);
  };

  displayLegend() {
    const self = this;
    return this.labels.map(function(label, index) {
      return (
        <div className="item legend-item" key={index}>
            <a className="ui empty circular
                label" style={{backgroundColor: colours[index]}}>
            </a>
                {`${self.splitStingAtCapitals(label).join(" ")}: ${currencyFormat(self.values[index])}`}
        </div>
      )
    })
  };

  componentWillMount() {
    const { title, data, description, colours } = this.props;
    let dataCopy = Object.assign({}, data);

    this.title = title;
    this.total = (function getAndremoveTotal(d) {
      let res;
      if (d.hasOwnProperty('TotalFunds')) {
        res = parseInt(data.TotalFunds);
        delete d.TotalFunds;
      } else {
        res = parseInt(data.Total);
        delete d.Total;
      }
      return res;
    })(dataCopy);

    this.labels = Object.keys(dataCopy);
    this.values = Object.values(dataCopy).map(x => parseInt(x));

    this.chartData = {
      labels: this.labels,
      datasets: [{
        label: 'Income',
        data: this.values,
        backgroundColor: colours,
        hoverBackgroundColor: colours
      }]
    };
  };

  componentDidMount() {
    const self = this;

    const displayChart = function displayChart(dom) {
      const myChart = new Chart(dom, {
        type: 'pie',
        data: self.chartData,
        options: {
          legend: {
            display: false,
            position: 'right'
          }
        }
      });
    };



    displayChart(this.financialChart);
  };

  componentWillUnmount() {
    $(this.financialChart).remove();
  };

  render() {
    if (this.labels.length === 0) {
      return (<span></span>);
    }
    return (
      <div className="item">
        <div className="ui small image">
            <canvas id="myChart" ref={(input) => { this.financialChart = input; }} width="350" height="350"></canvas>
        </div>
        <div className="content">
            <a className="header">{`${this.title}: ${currencyFormat(this.total)}`}</a>
            <div className="meta">
                <span>{this.description}</span>
            </div>
            <div className="description">
                <div className="ui divided selection list">
                    {this.displayLegend()}
                </div>
            </div>
            <div className="extra">
                Additional Details
            </div>
        </div>
    </div>
    )
  };
};

const EmailButton = function EmailButton({ emailAddress }) {
  if (emailAddress !== "") {
    return (
      <a href={"mailto:" + emailAddress.toLowerCase()}>
                  <button className="ui labeled icon tiny green button">
                          <i className="mail icon"></i>
                          Email
                        </button>   
              </a>
    )
  }
  return (<span></span>);
};

const WebsiteButton = function WebsiteButton({ webSiteAddress }) {
  if (webSiteAddress !== "") {
    return (
      <a href={"http://" + webSiteAddress.toLowerCase()}>
            <button className="ui labeled icon tiny green button">
                      <i className="linkify icon"></i>
                      Website
                    </button>                                                                       
          </a>
    )
  }
  return (<span></span>);
};

const WhoWhatHow = function WhoWhatHow({ classification }) {

  const list = classification.map(function(x, i, arr) {
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

const CharityNotFound = function CharityNotFound() {
  return (
    <div className="ui vertical basic segment cto-group">
        <div className="ui left aligned text container cto">
            <h1 className="ui header">
                Looking for a charity?
                <div className="sub header">
                    We could not find the charity you want to see. If you think
                    it should be included then please consider contacting us.
                </div>
                </h1>
            <button className="ui large green button">
                Contact Us
            </button>
        </div>
    </div>
  )
};

const Comments = function Comments({ charity }) {

  const handleNewComment = function handleNewComment(comment) {
    console.log(comment.text);
  };

  // console.log(
  //   typeof charity.registeredCharityNumber.toString(),
  //   typeof charity.name,
  //   typeof `https://www.islamiccharities.org.uk/charity/${charity.registeredCharityNumber}`
  // )

  return (
    <ReactDisqusComments
        shortname="http-islamiccharities-org-uk"
        identifier={charity.registeredCharityNumber.toString()}
        title={charity.name}
        url={`https://www.islamiccharities.org.uk/charity/${charity.registeredCharityNumber}`}
        category_id=""
        onNewComment={handleNewComment}
    />
  )
};

export default class CharityPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  };

  componentDidMount() {};

  componentWillMount() {};

  componentWillUnmount() {};

  render() {

    const style = {
      border: "0",
      width: "100%",
      height: "100%"
    };

    const humanizeText = {
      textTransform: 'capitalize'
    }

    const { charity, loading } = this.props;

    if (loading) {
      return (
        <Loader message="Loading charity..." />
      )
    }

    if (charity === undefined) {
      return (
        <CharityNotFound />
      );
    };

    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${charity.postCode.replace(" ", "")}&zoom=14&size=500x500&key=%20AIzaSyB3Lx8yogEqNp8VB4l2tH88qTQwh8s2gGQ`;
    const mapStyle = {
      backgroundImage: `url(${mapUrl})`
    };



    return (
      <span>
          <div className="ui vertical basic segment charity-main">
              <div className="ui container">
                  <div className="ui equal width stackable grid">
                      <div className="ui stretched row">
                          <div className="eleven wide column">
                              <div className="ui basic segment test" style={mapStyle}>
                                  <div className="ui basic inverted segment">
                                      <h1 className="ui inverted header masthead">
                                      {charity.name}                              
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
                                          <div className="item">{charity.address.Line1 ? charity.address.Line1.toLowerCase() : ""}</div>
                                          <div className="item">{charity.address.Line2 ? charity.address.Line2.toLowerCase() : ""}</div>
                                          <div className="item">{charity.address.Line3 ? charity.address.Line3.toLowerCase() : ""}</div>
                                          <div className="item">{charity.address.Line4 ? charity.address.Line4.toLowerCase() : ""}</div>
                                          <div className="item">{charity.address.Line5 ? charity.address.Line5.toLowerCase() : ""}</div>
                                          <div className="item">{charity.postCode}</div>
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
                                            {charity.charityRoleName}
                                          </div>
                                        </div>
                                        <div className="item">
                                          <i className="phone icon"></i>
                                          <div className="content">
                                            {charity.publicTelephoneNumber}
                                          </div>
                                        </div>
                                        <div className="item">
                                          <i className="fax icon"></i>
                                          <div className="content">
                                            {charity.publicFaxNumber}
                                          </div>
                                        </div>
                                        <div className="item">
                                          <div className="content">
                                              <EmailButton emailAddress={charity.emailAddress} />
                                          </div>
                                        </div>
                                        <div className="item">
                                          <div className="content">
                                              <WebsiteButton webSiteAddress={charity.webSiteAddress} />
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
                                                  Charity Number: {charity.registeredCharityNumber}
                                              </div>
                                          </div>
                                          <div className="item">
                                              <i className="info circle icon"></i>
                                              <div className="content">
                                                  Company Number: {charity.registeredCompanyNumber}
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
                                                  {charity.activities}
                                              </div>
                                          </div>
                                      </div>
                                      <div className="item">
                                          <div className="content">
                                              <a className="header">Who We Serve</a>
                                              <div className="description">
                                                  <WhoWhatHow classification={charity.who} />
                                              </div>
                                          </div>
                                      </div>
                                      <div className="item">
                                          <div className="content">
                                              <a className="header">What we do</a>
                                              <div className="description">
                                                  <WhoWhatHow classification={charity.what} />
                                              </div>
                                          </div>
                                      </div>
                                      <div className="item">
                                          <div className="content">
                                              <a className="header">How we work</a>
                                              <div className="description">
                                                  <WhoWhatHow classification={charity.how} />
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
                                                  Area Of Benefit: {charity.areaOfBenefit[0] + charity.areaOfBenefit.slice(1).toLowerCase()}
                                              </div>
                                          </div>
                                          <div className="item">
                                              <i className="info circle icon"></i>
                                              <div className="content">
                                                  Area Of Operation: {charity.areaOfOperation.map((x) => {return x[0] + x.slice(1).toLowerCase()}).join(', ')}
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
                            data={charity.incoming}
                            description={"Income for the previous financial year"}
                            colours={colours} 
                        />
                       <Financial 
                            title={"Expenditure"} 
                            data={charity.expended}
                            description={"What money was spent on during the previous financial year"}
                            colours={colours} 
                        />
                         <Financial 
                            title={"Funds"} 
                            data={charity.funds}
                            description={"Funds"}
                            colours={colours} 
                        />
                        <Submission 
                            title={"History"} 
                            data={charity.submission}
                            description={"Historical Income v Spending"}
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
                                Own Use Assets: {Object.keys(charity.assets).length !== 0 ? (currencyFormat(parseInt(charity.assets.TotalFixedAssets) + parseInt(charity.assets.FixedAssetInvestments))) : <NoData text={"No Data"} />}
                              </div>
                            </div>
                            <div className="item">
                              <i className="info circle icon"></i>
                              <div className="content">
                                Long Term Investments: {Object.keys(charity.assets).length !== 0 ? (currencyFormat(parseInt(charity.assets.FixedAssetInvestments))) : <NoData text={"No Data"} />}
                              </div>
                          </div>
                          <div className="item">
                            <i className="info circle icon"></i>
                            <div className="content">
                              Pension Scheme Asset Liability: {Object.keys(charity.assets).length !== 0 ? (currencyFormat(parseInt(charity.assets.PensionFundAssets))) : <NoData text={"No Data"} />}
                            </div>
                          </div>
                          <div className="item">
                            <i className="info circle icon"></i>
                            <div className="content">
                              Other Assets: {Object.keys(charity.assets).length !== 0 ? (currencyFormat(parseInt(charity.assets.TotalCurrentAssets))) : <NoData text={"No Data"} />}
                            </div>
                          </div>
                          <div className="item">
                            <i className="info circle icon"></i>
                            <div className="content">
                                Total Liability: {Object.keys(charity.assets).length !== 0 ? currencyFormat((parseInt(charity.assets.CreditorsDueWithinOneYear) + parseInt(charity.assets.LongTermCreditors))) : <NoData text={"No Data"} />}
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
                                            <Trustees trustees={charity.trustees} />
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="ui inverted segment charity-main-sidebar">
                                            <div className="ui basic segment">
                                                <div className="ui mini list numbers">
                                                    <div className="item">
                                                        <i className="info circle icon"></i>
                                                        <div className="content ">
                                                            Employees: {charity.employees.NoEmployees}
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <i className="info circle icon"></i>
                                                        <div className="content">
                                                            Volunteers: {charity.employees.NoVolunteers}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ui inverted horizontal divider">
                                                🌙
                                            </div>
                                            <div className="ui basic segment">
                                                <h4 className="ui inverted header">
                                                    Download Reports
                                                        <div className="sub header">
                                                            As submitted by the charity 
                                                            to the Charity Commission
                                                        </div>
                                                </h4>
                                                <CharityReports accountListing={charity.accountListing} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
          </div>
          <div className="ui vertical basic segment">
            <div className="ui container">
              <Comments charity={charity}/>
            </div>
          </div>
      </span>
    )
  }
};
