import React from 'react'
import { Link } from 'react-router'
import { currencyFormat } from '../../helpers/helpers'

const HighestGrossIncomeCard = ({ GrossIncome, RegisteredCharityNumber }) => {


  return (
  	<div className="card">
      <div className="content">
        <div className="center aligned header">
          <div className="ui small statistic">
            <div className="value">
              {currencyFormat(GrossIncome)}
            </div>
            <div className="label">
              #1 for gross income
            </div>
          </div>
        </div>
        <div className="meta">
          Updated yesterday
        </div>
        <div className="description">
          This Islamic charity reported the highest gross income 
          from all those that we surveyed.
        </div>
      </div>
      <div className="extra content">
      </div>
      <div className="ui bottom attached button">
        <i className="pointing up icon"></i>
          <Link to={"/charity/" + RegisteredCharityNumber}>SHOW ME</Link>
      </div>
    </div>
  );
}

export default HighestGrossIncomeCard;