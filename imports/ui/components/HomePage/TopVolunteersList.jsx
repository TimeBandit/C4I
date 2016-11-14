import React from 'react'
import { Link } from 'react-router'
import { currencyFormat } from '../../helpers/helpers'

const ListItem = ({ item }) => {
  return (
    <div className="item">
      <div className="content">
        <div className="ui tiny horizontal statistic">
            <div className="value">
              {item.Volunteers}
            </div>
            <div className="label">
              {item.CharityName}
            </div>
          </div>
      </div>
      <div className="right floated content">
        <div className="tiny ui button">
          <Link to={"/charity/" + item.RegisteredCharityNumber}>View</Link>
        </div>
      </div>
    </div>
  );
}

const makeList = (result) => {
  return result.map(function(el, idx, arr) {
    console.log(el.CharityName, el.Volunteers)
    return <ListItem key={idx} item={el} />
  })
}

const TopVolunteersList = ({ loading, resultExists, result }) => {
  return (
    <div className="ui middle aligned divided list">
      {resultExists ? makeList(result) : "loading"}
    </div>
  );
}

export default TopVolunteersList;
