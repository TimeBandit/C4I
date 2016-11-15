/*jshint esversion: 6 */
import React from 'react'
import { Link } from 'react-router'
import TopGrossIncomeContainer from '../containers/HomePage/TopGrossIncomeContainer'
import TopTotalExpenditureContainer from '../containers/HomePage/TopTotalExpenditureContainer'
import TopEmployeesContainer from '../containers/HomePage/TopEmployeesContainer'
import TopVolunteersContainer from '../containers/HomePage/TopVolunteersContainer'

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
    return (
      <span>
        <div className="ui inverted vertical masthead center aligned segment">
          <div className="ui text container">
            <h1 className="ui inverted header">
              Charities 4 Islam
              <div className="inverted sub header">
                We search public data on Islamic charities to 
                bring you the key facts. 
              </div>
            </h1>
            <p></p>
            <div className="ui huge primary button">See the results <i className="down arrow icon" /></div>
          </div>
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