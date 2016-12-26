import React from 'react'
import { currencyFormat } from '../helpers/helpers'

export default class Income extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.renderChart = this.renderChart.bind(this);
  };

  renderChart() {
    let chartData = this.props.chartData;;
    delete chartData.Total;

    const data = {
      labels: Object.keys(this.props.chartData),
      series: Object.values(this.props.chartData)
    }

    new Chartist.Bar('.ct-chart', data, {
      stackBars: true,
      stackMode: 'accumulate',
      distributeSeries: true,
      width: '20%',
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      axisX: {
        showLabel: false,
        showGrid: false
      },
      axisY: {
        showLabel: false,
        showGrid: false
      }
    });

  };

  renderLegend() {
    let chartData = this.props.chartData;
    delete chartData.Total;
    // ******** work here **** //
    const labels = Object.keys(this.props.chartData),
    const  series: Object.values(this.props.chartData)

    return Object.keys(this.props.chartData).map(function(value, index) {
      return (
        <div className="item" key={index}>{value.split(/(?=[A-Z])/).join(" ")}</div>
      )
    })

  };

  componentDidMount() {
    console.log(this);
    this.renderChart()
  };

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
        <div className="ui segment">
          <div className="ui list">
            <div className="item">Apples</div>
            <div className="item">Pears</div>
            <div className="item">Oranges</div>
            {this.renderLegend()}
          </div>
        </div>
      </div>
    )
  };
};

// new Chartist.Pie('.ct-chart', d, {
//   chartPadding: 30,
//   labelOffset: 50,
//   labelDirection: 'explode'
// });

// const colours = ["#1abc9c", "#16a085", "#f1c40f", "#f39c12", "#2ecc71", "#27ae60", "#e67e22"]

// // give enough time for the chart to be drawn
// setTimeout(function() {

//   const paths = document.querySelectorAll('.ct-slice-pie');
//   paths.forEach(function(path, index) {
//     path.style.fill = colours[index];
//   });

// }, 10);

// let data = {
//   labels: ['Mon'],
//   series: [5, 2, 4, 2, 0]
// };
