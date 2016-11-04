/*jshint esversion: 6 */
import React from 'react'
import { Link } from 'react-router'
import { currencyFormat } from '../helpers/helpers'
import HighestGrossIncomeCard from '../components/HomePage/HighestGrossIncomeCard';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { subscriptionHandle, loading, val } = this.props;

    // console.log('on the client');
    // console.log(subscriptionHandle);
    // console.log(loading);
    console.log(val);

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
              {val === undefined ? <div className="ui active loader"></div> : <HighestGrossIncomeCard GrossIncome={val.GrossIncome} RegisteredCharityNumber={val.RegisteredCharityNumber} />}
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
