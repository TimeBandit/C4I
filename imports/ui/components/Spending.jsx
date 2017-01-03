import React from 'react'
import { currencyFormat } from '../helpers/helpers'

export default class Spending extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  };

  componentDidMount() {
    const d = {
      // A labels array that can contain any sort of values
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      // Our series array that contains series objects or in this case series data arrays
      series: [
        [5, 2, 4, 2, 0]
      ]
    };
    new Chartist.Line('.ct-chart2', d);
  }

  render() {

    return (
      <div className="column">
				<div className="ui segment">
				  <div className="ui tiny statistic">
				    <div className="value">
				      {currencyFormat(this.props.data.slice(-1)[0].TotalExpenditure)}
				    </div>
				    <div className="label">
				      Spending
				    </div>
				  </div>
		  		<div className="ct-chart2 ct-perfect-fourth">
		  	</div>
			</div>
		</div>
    )
  }
};
