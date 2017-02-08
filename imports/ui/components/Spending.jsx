import React from 'react'
import { currencyFormat } from '../helpers/helpers'

export default class Spending extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colours: ["#FF851B", "#FFE21F", "#D9E778", "#2ECC40", "#6DFFFF", "#54C8FF", "#A291FB"],
      data: 'set in componentWillMount'
    };
    this.renderChart = this.renderChart.bind(this);
    this.renderLegend = this.renderLegend.bind(this);
    this.setColours = this.setColours.bind(this);
  };

  renderChart() {
    const self = this;

    const chartData = this.props.chartData;
    delete chartData.Total;

    const data = {
      series: this.state.data.map(x => parseInt(x[1]))
    };
    // labels: this.state.data.map(x => x[0]),
    let options = {
      width: '200px',
      height: '200px',
      chartPadding: 30,
      showLabel: false
    };

    let responsiveOptions = [
      ['screen and (max-width: 400px)', {
        padding: { top: 30, right: 0, bottom: 30, left: 30 }
      }],
      ['screen and (min-width: 401px)', {
        padding: 30
      }]
    ];

    let chart = new Chartist.Pie('.spending-chart', data, options);
    chart.on('draw', function(argument) {
      self.setColours();
    })
  };

  renderLegend() {
    const colours = this.state.colours;
    const res = this.state.data.map(function(keyVal, index) {
      return (
        <div className="item" key={index}>
          <div className="ui horizontal label spending-legend">
            {currencyFormat(parseInt(keyVal[1]))}
          </div>
          {keyVal[0].split(/(?=[A-Z])/).join(" ")}
        </div>
      )
    });
    return res.reverse();
  };

  setColours() {
    const colours = this.state.colours;
    // give enough time for the chart to be drawn
    setTimeout(function() {
      const barChart = document.querySelectorAll('.spending-chart .ct-slice-pie');
      let legendLabels = document.querySelectorAll('.spending-legend');
      barChart.forEach(function(bar, index) {
        bar.style.fill = colours[index];
        legendLabels[index].style.backgroundColor = colours[colours.length - index - 1];
      });
    }, 15);

  }

  componentWillMount() {
    let dataObject = this.props.chartData;
    delete dataObject.Total;
    // make ordered list of the data
    let orderedData = Object.keys(dataObject)
      .map(function(key, index, arr) {
        return [key, dataObject[key]]
      })
      .sort(function(first, second) {
        if (parseInt(first[1]) < parseInt(second[1])) {
          return 1
        };
        if (parseInt(first[1]) > parseInt(second[1])) {
          return -1
        };
        return 0;
      });
    this.setState({ data: orderedData });
  };

  componentDidMount() {
    this.renderChart();
    this.setColours();
  };

  render() {

    return (
      <div className="ui items income-item">
        <div className="item">
          <div className="image ct-chart ct-perfect-fourth spending-chart">
          </div>
          <div className="content income-item-content">
            <a className="header">
              {currencyFormat(this.props.data.slice(-1)[0].TotalExpenditure)}
            </a>
            <div className="meta">
              <span>Total Spending</span>
            </div>
            <div className="description">
              <div className="ui divided list">
                {this.renderLegend()}
              </div>
            </div>
            <div className="extra">
              Additional Details
            </div>
          </div>
        </div>
      </div>
    )
  };
};