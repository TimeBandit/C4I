import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { currencyFormat } from '../../helpers/helpers';


// export default TopGrossIncomeList;

export default class TopGrossIncomeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      charity: {}
    };
    this.updateResult = this.updateResult.bind(this);
  };

  updateResult() {
    let self = this;
    Meteor.call('topGrossIncome', function(error, result) {
      // console.log('method call ', result);
      if (result.hasOwnProperty('CharityName')) {
        self.setState({ charity: result });
      };
    });
  };

  componentWillMount() {
    this.updateResult();
  };

  componentDidMount() {};

  render() {
    if (this.state.charity.hasOwnProperty('CharityName')) {
      return (
        <div className="card">
            <div className="content">
                <div className="header">{currencyFormat(this.state.charity.GrossIncome)}</div>
                <div className="meta">Total Income</div>
                <div className="description">
                    The Gross Income of the Islamic Charity with the greatest yearly income reported last year
                </div>
            </div>
            <div className="extra content">
                <div className="ui large green fluid button">
                    <Link to={"/charity/" + this.state.charity.RegisteredCharityNumber}>See Charity</Link>
                </div>
            </div>
        </div>
      );
    }
    return (
      <div className="card">
          <div className="content">
              <div className="ui active centered inline loader"></div>
          </div>
        </div>
    );
  };
};
