/*jshint esversion: 6 */
import React from 'react'
import { currencyFormat } from '../helpers/helpers';

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
              <div className="card">
                <div className="content">
                  <div className="center aligned header">
                    <div className="ui small statistic">
                      <div className="value">
                        {val === undefined ? "wait" : currencyFormat(val.GrossIncome)}
                      </div>
                      <div className="label">
                        #1 for gross income
                      </div>
                    </div>
                  </div>
                  <div className="meta">
                    <a>Friends</a>
                  </div>
                  <div className="description">
                    This Islamic charity reported the highest gross income 
                    from all those that we surveyed.
                  </div>
                </div>
                <div className="extra content">
                  <span className="right floated">
                    Joined in 2013
                  </span>
                  <span>
                    <i className="user icon"></i>
                    75 Friends
                  </span>
                </div>
                <div className="ui bottom attached button">
                  <i className="pointing up icon"></i>
                  Go to charity
                </div>
              </div>
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
