import React from 'react'
import { currencyFormat } from '../helpers/helpers'

export default class Income extends React.Component {
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
    const chartData = this.props.chartData;
    delete chartData.Total;

    const data = {
      labels: this.state.data.map(x => x[0]),
      series: this.state.data.map(x => parseInt(x[1]))
    }

    new Chartist.Bar('.ct-chart', data, {
      stackBars: true,
      stackMode: 'accumulate',
      distributeSeries: true,
      width: '100%',
      height: '100%',
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
    const colours = this.state.colours;
    const res = this.state.data.map(function(keyVal, index) {
      return (
        <div className="item" key={index}>
          <div className="ui horizontal label income-legend">
            {keyVal[0].split(/(?=[A-Z])/).join(" ")}
          </div>
          {currencyFormat(parseInt(keyVal[1]))}
        </div>
      )
    });
    return res.reverse();
  };

  setColours() {
    const colours = this.state.colours;
    // give enough time for the chart to be drawn
    setTimeout(function() {
      const barChart = document.querySelectorAll('.ct-bar');
      let legendLabels = document.querySelectorAll('.income-legend');
      barChart.forEach(function(bar, index) {
        bar.style.stroke = colours[index];
        legendLabels[index].style.backgroundColor = colours[colours.length - index - 1];
      });
    }, 10);

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
      <div className="column">
        <div className="ui segment">
          <div className="ui left floated basic segment">
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
          <div className="ui right floated basic segment">
            <div className="ui list">
              {this.renderLegend()}
            </div>
          </div>
        </div>
      </div>

    )
  };
};

{
  /*<div className="ui items">
          <div className="item">
            <div className="image">
            </div>
              <div className="ct-chart ct-perfect-fourth">
            </div>
            <div className="content">
              <a className="header">
                {currencyFormat(this.props.data.slice(-1)[0].GrossIncome)}
              </a>
              <div className="meta">
                <span>Total Income</span>
              </div>
              <div className="description">
                <div className="ui list">
                  {this.renderLegend()}
                </div>
              </div>
              <div className="extra">
                Additional Details
              </div>
            </div>
          </div>
        </div>*/
}
