import React from 'react';
import { currencyFormat } from '../helpers/helpers';

// AFTER
const UIStatistic = ({ value, label }) => {
  return (
    <div className="ui tiny statistic">
      <div className="value">
        {currencyFormat(value)}
      </div>
      <div className="label">
        {label}
      </div>
    </div>
  );
}

export default UIStatistic;
