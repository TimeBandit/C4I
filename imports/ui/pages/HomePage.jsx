/*jshint esversion: 6 */
import React from 'react';

export default class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    const { maxGrossIncomeHandle, loading, maxGrossIncomeCharity } = this.props;
    console.log(`loading state ${loading}`);
    console.log(loading ? "wait" : maxGrossIncomeCharity.GrossIncome);

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
            <div className="ui four doubling cards">
              <div className="card">
                <div className="content">
                  <div className="center aligned header">
                    <div className="ui statistic">
                      <div className="value">
                        {loading ? "wait" : maxGrossIncomeCharity.GrossIncome}
                      </div>
                      <div className="label">
                        Largest gross Income
                      </div>
                    </div>
                  </div>
                  <div className="meta">
                    <a>Friends</a>
                  </div>
                  <div className="description">
                    Matthew is an interior designer living in New York.
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
              </div>
              <div className="card">
                <div className="image">
                  <img src="/images/avatar2/large/molly.png" />
                </div>
                <div className="content">
                  <div className="header">Molly</div>
                  <div className="meta">
                    <span className="date">Coworker</span>
                  </div>
                  <div className="description">
                    Molly is a personal assistant living in Paris.
                  </div>
                </div>
                <div className="extra content">
                  <span className="right floated">
                    Joined in 2011
                  </span>
                  <span>
                    <i className="user icon"></i>
                    35 Friends
                  </span>
                </div>
              </div>
              <div className="card">
                <div className="image">
                  <img src="/images/avatar2/large/elyse.png" />
                </div>
                <div className="content">
                  <div className="header">Elyse</div>
                  <div className="meta">
                    <a>Coworker</a>
                  </div>
                  <div className="description">
                    Elyse is a copywriter working in New York.
                  </div>
                </div>
                <div className="extra content">
                  <span className="right floated">
                    Joined in 2014
                  </span>
                  <span>
                    <i className="user icon"></i>
                    151 Friends
                  </span>
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