import React from 'react'
import { Link } from 'react-router'
import { currencyFormat } from '../../helpers/helpers'

const TopGrossIncome = ({ loading, resultExists, result }) => {

  const title = "#1 for gross income";
  const description = "This Islamic charity reported the highest gross income \
                      from all those that we surveyed.";

  // resultExists? console.log(result) : "wating";
  return (
    <div className="card">
      <div className="content">
        <div className="center aligned header">
          <div className="ui small statistic">
            <div className="value">
              {resultExists? currencyFormat(result.GrossIncome) : ""}
            </div>
            <div className="label">
              {title}
            </div>
          </div>
        </div>
        <div className="meta">
          Updated yesterday
        </div>
        <div className="description">
          {description}
        </div>
      </div>
      <div className="extra content">
      </div>
      <div className="ui bottom attached button">
        <i className="pointing up icon"></i>
          {resultExists? <Link to={"/charity/" + result.RegisteredCharityNumber}>SHOW ME</Link> : ""}
      </div>
    </div>
  );
}

export default TopGrossIncome;
