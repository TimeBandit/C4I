import React from 'react'
import { Link } from 'react-router'
import { currencyFormat } from '../../helpers/helpers'

const TotalExpenditureCard = ({ TotalExpenditure, RegisteredCharityNumber, text }) => {


  return (
  	<div className="card">
      <div className="content">
        <div className="center aligned header">
          <div className="ui small statistic">
            <div className="value">
              {currencyFormat(TotalExpenditure)}
            </div>
            <div className="label">
              {text.title}
            </div>
          </div>
        </div>
        <div className="meta">
          Updated yesterday
        </div>
        <div className="description">
          {text.description}
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

export default TotalExpenditureCard;