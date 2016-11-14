import React from 'react'
import { Link } from 'react-router'
import { currencyFormat } from '../../helpers/helpers'

const ListItem = ({ item }) => {
  return (
    <div className="item">
      <div className="right floated content">
        <div className="tiny ui button">
          <Link to={"/charity/" + item.RegisteredCharityNumber}>View</Link>
        </div>
      </div>
      <div className="content">
        <div className="ui tiny statistic">
            <div className="value">
              {currencyFormat(item.TotalExpenditure)}
            </div>
          </div>
      </div>
    </div>
  );
}

const makeList = (result) => {
  return result.map(function(el, idx, arr) {
    return <ListItem key={idx} item={el} />
  })
}

const TopTotalExpenditureList = ({ loading, resultExists, result }) => {
  return (
    <div className="ui middle aligned divided list">
      {resultExists ? makeList(result) : "loading"}
    </div>
  );
}

export default TopTotalExpenditureList;