/*jshint esversion: 6 */
import React from 'react'
import { Link } from 'react-router'
import TopGrossIncomeContainer from '../containers/HomePage/TopGrossIncomeContainer'
import TopTotalExpenditureContainer from '../containers/HomePage/TopTotalExpenditureContainer'
import TopEmployeesContainer from '../containers/HomePage/TopEmployeesContainer'
import TopVolunteersContainer from '../containers/HomePage/TopVolunteersContainer'
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
        <div className="ui vertical masthead center aligned segment">
          <div className="ui text container">
            <h1 className="ui header">
              Islamic Charity Book
              <div className="sub header">
                The #1 resource for finding Islamic charities based in the UK
              </div>
            </h1>
            <p></p>
          </div>
        </div>        
      </span>
    )
  }
}
