/*jshint esversion: 6 */
import React from 'react'
import { Link } from 'react-router'
import { currencyFormat } from '../helpers/helpers'
import GrossIncomeCard from '../components/HomePage/GrossIncomeCard'
import TotalExpenditureCard from '../components/HomePage/TotalExpenditureCard';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { 
      subscriptionHandle, 
      loading, topGrossIncome, 
      bottomGrossIncome, 
      topTotalExpenditure, 
      bottomTotalExpenditure 
    } = this.props;

    const topGrossIncomeText = {
        title: "#1 for gross income",
        description: "This Islamic charity reported the highest gross income from all those that we surveyed."
    };

    const bottomGrossIncomeText = {
        title: "Lowest gross income",
        description: "This Islamic charity reported the lowest gross income from all those that we surveyed."
    };

    const topTotalExpenditureText = {
        title: "#1 for total expenditure",
        description: "This Islamic charity reported the highest total expenditure from all those that we surveyed."
    };

    const bottomTotalExpenditureText = {
        title: "Lowest total expenditure",
        description: "This Islamic charity reported the lowest total expenditure from all those that we surveyed."
    };
    
    console.log(topGrossIncome);

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
          <div className="ui container">
            <div className="ui three doubling cards">
              {topGrossIncome === undefined ? <div className="ui active loader"></div> : <GrossIncomeCard GrossIncome={topGrossIncome.GrossIncome} RegisteredCharityNumber={topGrossIncome.RegisteredCharityNumber} text={topGrossIncomeText}/>}
              {bottomGrossIncome === undefined ? <div className="ui active loader"></div> : <GrossIncomeCard GrossIncome={bottomGrossIncome.GrossIncome} RegisteredCharityNumber={bottomGrossIncome.RegisteredCharityNumber} text={bottomGrossIncomeText}/>}
              {bottomGrossIncome === undefined ? <div className="ui active loader"></div> : <TotalExpenditureCard TotalExpenditure={topTotalExpenditure.TotalExpenditure} RegisteredCharityNumber={topTotalExpenditure.RegisteredCharityNumber} text={topTotalExpenditureText}/>}
              {bottomGrossIncome === undefined ? <div className="ui active loader"></div> : <TotalExpenditureCard TotalExpenditure={bottomTotalExpenditure.TotalExpenditure} RegisteredCharityNumber={bottomTotalExpenditure.RegisteredCharityNumber} text={bottomTotalExpenditureText}/>}
            </div>
          </div>
        </div>
        
      </span>

    )

  }

}

// const HomePage = () => (
// );

// export default HomePage;
