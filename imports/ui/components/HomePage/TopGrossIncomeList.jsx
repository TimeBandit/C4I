import React from 'react'
import { Link } from 'react-router'
import { currencyFormat } from '../../helpers/helpers'

const ListItem = ({ item }) => {
  return (
    <div className="card">
        <div className="content">
            <div className="header">{currencyFormat(item.GrossIncome)}</div>
            <div className="meta">Total Income</div>
            <div className="description">
                The Gross Income of the Islamic Charity with the greatest yearly income reported last year
            </div>
        </div>
        <div className="extra content">
            <button className="ui large green fluid button">
                <Link to={"/charity/" + item.RegisteredCharityNumber}>See Charity</Link>
            </button>
        </div>
    </div>
  );
}

// const makeList = (result) => {
//   return result.map(function(el, idx, arr) {
//     return <ListItem key={idx} item={el} />
//   })
// }

const TopGrossIncomeList = ({ loading, resultExists, result }) => {
  console.log(loading, resultExists, result);
  if (resultExists) {
    return (
      <div className="card">
        <div className="content">
            <div className="header">{currencyFormat(result.GrossIncome)}</div>
            <div className="meta">Total Income</div>
            <div className="description">
                The Gross Income of the Islamic Charity with the greatest yearly income reported last year
            </div>
        </div>
        <div className="extra content">
            <button className="ui large green fluid button">
                <Link to={"/charity/" + result.RegisteredCharityNumber}>See Charity</Link>
            </button>
        </div>
    </div>
    );

  }
  return (
    <div className="card">
        <div className="content">
            <div className="header">NO DATA</div>
        </div>
    </div>
  );
}

export default TopGrossIncomeList;

// <div className="item">
//       <div className="right floated content">
//         <div className="tiny ui button">
//           <Link to={"/charity/" + item.RegisteredCharityNumber}>View</Link>
//         </div>
//       </div>
//       <div className="content">
//         <a className="header">
//           {currencyFormat(item.GrossIncome)}
//         </a>
//         <div className="description">
//           {item.CharityName}
//         </div>        
//       </div>
//     </div>
