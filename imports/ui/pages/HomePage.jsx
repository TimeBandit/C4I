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
        <div className="ui vertical basic segment box overlay green-filter masthead">
            <div className="ui container">
                <h1 className="header">
                    🕌<br/>
                    Islamic Charity
                    <br/>
                    Book
                </h1>
                <h2 className="motto">
                    The #1 resource on all Islamic <br/>
                    Charities registered in the UK
                </h2>
            </div>
        </div>
        <div className="ui vertical basic segment">
            <div className="ui text container custom">
                <h3 className="ui sub header">
                    The #1 resource on all Islamic Charities registered in the UK
                </h3>
            </div>
        </div>
        <div className="ui vertical basic segment">
            <div className="ui container">
                <div className="ui centered grid">
                    <div className="twelve wide column homepage-stats">
                        <div className="ui three stackable doubling cards">
                            <TopGrossIncomeContainer />
                            <div className="card">
                                <div className="content">
                                    <div className="header">200</div>
                                    <div className="meta">Employees</div>
                                    <div className="description">
                                        Number of employees of the Islamic charity with the greatest number of people working for them
                                    </div>
                                </div>
                                <div className="extra content">
                                    <button className="ui large green fluid button">
                                        See Charity
                                    </button>
                                </div>
                            </div>
                            <div className="card">
                                <div className="content">
                                    <div className="header">16000</div>
                                    <div className="meta">Volunteers</div>
                                    <div className="description">
                                        Number of volunteers of the Islamic charity with the greatest number enrolled
                                    </div>
                                </div>
                                <div className="extra content">
                                    <button className="ui large green fluid button">
                                        See Charity
                                    </button>
                                </div>
                            </div>
                            <div className="card">
                                <div className="content">
                                    <div className="header">£1.9M</div>
                                    <div className="meta">Total Income</div>
                                    <div className="description">
                                        The gross income of the Islamic charity with the greatest yearly income last year
                                    </div>
                                </div>
                                <div className="extra content">
                                    <button className="ui large green fluid button">
                                        See Charity
                                    </button>
                                </div>
                            </div>
                            <div className="card">
                                <div className="content">
                                    <div className="header">£1.9M</div>
                                    <div className="meta">Total Income</div>
                                    <div className="description">
                                        The gross income of the Islamic charity with the greatest yearly income last year
                                    </div>
                                </div>
                                <div className="extra content">
                                    <button className="ui large green fluid button">
                                        See Charity
                                    </button>
                                </div>
                            </div>
                            <div className="card">
                                <div className="content">
                                    <div className="header">£1.9M</div>
                                    <div className="meta">Total Income</div>
                                    <div className="description">
                                        The gross income of the Islamic charity with the greatest yearly income last year
                                    </div>
                                </div>
                                <div className="extra content">
                                    <button className="ui large green fluid button">
                                        See Charity
                                    </button>
                                </div>
                            </div>
                            <div className="card">
                                <div className="content">
                                    <div className="header">£1.9M</div>
                                    <div className="meta">Total Income</div>
                                    <div className="description">
                                        The gross income of the Islamic charity with the greatest yearly income last year
                                    </div>
                                </div>
                                <div className="extra content">
                                    <button className="ui large green fluid button">
                                        See Charity
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="ui vertical basic segment cto-group">
            <div className="ui left aligned text container cto">
                <h1 className="ui header">
                    Looking for a charity?
                    <div className="sub header">
                        See how you favourite charity is funded <br/>
                        and managed
                    </div>
                </h1>
                <button className="ui large green button">
                    See Charity
                </button>
                <h3 className="ui horizontal header divider">🕌</h3>
                <h1 className="ui header">
                            About this site
                            <div className="sub header">
                                The Islamic Charity Book is a directory of Islamic Charities registered in the UK. All the data you see here is publicly available. Missing a charity? Suggestions?
                            </div>
                        </h1>
                <button className="ui large green button">
                    See Charity
                </button>
            </div>
        </div>        
      </span>
    )
  }
}
