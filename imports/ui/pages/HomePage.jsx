/*jshint esversion: 6 */
import React from 'react'
import { Link } from 'react-router'
import TopGrossIncomeContainer from '../containers/HomePage/TopGrossIncomeContainer'
import TopTotalExpenditureContainer from '../containers/HomePage/TopTotalExpenditureContainer'
import TopEmployeesContainer from '../containers/HomePage/TopEmployeesContainer'
import TopVolunteersContainer from '../containers/HomePage/TopVolunteersContainer'
import SearchContainer from '../containers/SearchContainer'
import { currencyFormat } from '../helpers/helpers'

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    $('.ui.accordion')
      .accordion();
  }

  render() {

    const { loading, resultExists, result } = this.props;

    return (
      <span>
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui text container">
            <h1 className="ui inverted header">
              Islamic Charity Book
              <div className="inverted sub header">
                The #1 resource for finding Islamic charities based in the UK
              </div>
            </h1>
            <p></p>
            <SearchContainer />
          </div>
        </div>
        <div className="ui fluid three item icon menu">
          <a className="item">
            <i className="search icon"></i>
          </a>
          <a className="item">
            <i className="info icon"></i>
          </a>
          <a className="item">
            <i className="ordered list icon"></i>
          </a>
        </div>
        <div className="ui vertical segment">
          <ui className="container">
            <div className="ui statistics">
              <div className="statistic">
                <div className="value">
                  {resultExists? currencyFormat(result.GrossIncome): ""}
                </div>
                <div className="label">
                  Total Gross Income
                </div>
              </div>
              <div className="statistic">
                <div className="value">
                  {resultExists? currencyFormat(result.TotalExpenditure): ""}
                </div>
                <div className="label">
                  Views
                </div>
              </div>
              <div className="statistic">
                <div className="value">
                  {resultExists? result.Employees: ""}
                </div>
                <div className="label">
                  Employees
                </div>
              </div>
              <div className="statistic">
                <div className="value">
                  {resultExists? result.Volunteers: ""}
                </div>
                <div className="label">
                  Volunteers
                </div>
              </div>
            </div>
          </ui>
        </div>
        <div className="ui vertical segment">
          <ui className="container">
            <div className="ui styled fluid accordion">
              <div className="active title">
                <i className="dropdown icon"></i>
                Top 10 for Gross Income
              </div>
              <div className="content">
                <TopGrossIncomeContainer />
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Top 10 for Total Expenditure
              </div>
              <div className="content">
                <TopTotalExpenditureContainer />
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Top 10 Employers
              </div>
              <div className="content">
                <TopEmployeesContainer />
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                Top 10 for Volunteers
              </div>
              <div className="content">
                <TopVolunteersContainer />
              </div>
            </div>
          </ui>
        </div>
      </span>
    )
  }
}
