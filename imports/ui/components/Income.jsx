import React from 'react'
import { currencyFormat } from '../helpers/helpers'

export default class Income extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  };

  componentDidMount() {
    let chartData = this.props.chartData;
    delete chartData.Total;

    const d = {
      labels: Object.keys(this.props.chartData),
      series: Object.values(this.props.chartData)
    }

    new Chartist.Pie('.ct-chart', d, {
      donut: true
    });

    const colours = ["#1abc9c", "#16a085", "#f1c40f", "#f39c12", "#2ecc71", "#27ae60", "#e67e22"]

    // give enough time for the chart to be drawn
    setTimeout(function() {

      const paths = document.querySelectorAll('.ct-slice-pie');

      paths.forEach(function(path, index) {
        path.style.fill = colours[index];
      });

    }, 10);
  }

  render() {

    return (
      <div className="column">
				<div className="ui segment">
				  <div className="ui tiny statistic">
				    <div className="value">
							{currencyFormat(this.props.data.slice(-1)[0].GrossIncome)}				      
				    </div>
				    <div className="label">
				      Income
				    </div>
				  </div>
				  <div className="ct-chart ct-perfect-fourth">
				  </div>
		  	</div>
			</div>
    )
  }
};
