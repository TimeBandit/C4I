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
                <h1 className="header home-page-title">
                     🕌
                 </h1>
                {/*<h1 className="header home-page-title">
                   <br/>
                    Islamic Charity
                    <br/>
                    Book
                </h1>*/}
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
                            <TopEmployeesContainer />
                            <TopVolunteersContainer />
                            <TopTotalExpenditureContainer />
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
                <Link className="ui large green button" to="/search">
                    Search Now
                </Link>
                <h3 className="ui horizontal header divider">🕌</h3>
                <h1 className="ui header">
                            About this site
                            <div className="sub header">
                                The Islamic Charity Book is a directory of 
                                Islamic Charities registered in the UK. All the 
                                data you see here is publicly available. Missing 
                                a charity? Suggestions?
                            </div>
                        </h1>
                <Link className="ui large green button" to="/contact">
                    Contact Us
                </Link>
            </div>
        </div>        
      </span>
    )
  }
}
