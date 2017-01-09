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
    const self = this;
    const chartData = this.props.data;

    function generateLabels(arr) {
      return arr.map((obj) => {
        const yearEnding = obj.FyEnd;
        const date = new Date(yearEnding);
        return date.getFullYear().toString();
      });
    };

    function generateIncomeSeries(arr) {
      return arr.map((obj) => {
        return parseInt(obj.GrossIncome);
      })
    };

    function generateExpenditureSeries(arr) {
      return arr.map((obj) => {
        return parseInt(obj.TotalExpenditure);
      })
    };

    let chart = new Chartist.Bar('.financial-history-chart', {
      labels: generateLabels(chartData),
      series: [generateIncomeSeries(chartData), generateExpenditureSeries(chartData)]
    }, {
      seriesBarDistance: 10,
      axisX: {
        offset: 60
      },
      axisY: {
        offset: 80,
        labelInterpolationFnc: function(value) {
          // return '£' + value
          return currencyFormat(value);
        },
        scaleMinSpace: 15
      }
    });
    chart.on('draw', function(argument) {
      self.setColours();
    })
  };

  renderLegend() {
    return false;
  };

  setColours() {
    const colours = this.state.colours;
    // give enough time for the chart to be drawn
    setTimeout(function() {
      const barChart = document.querySelectorAll('.financial-history-chart .ct-bar');
      let legendLabels = document.querySelectorAll('.financial-history-legend');
      barChart.forEach(function(bar, index) {
        bar.style.fill = colours[index];
        legendLabels[index].style.backgroundColor = colours[colours.length - index - 1];
      });
    }, 15);

  }

  componentWillMount() {};

  componentDidMount() {
    this.renderChart();
    this.setColours();
  };

  render() {

    return (
      <span>
        <div className="image ct-chart ct-perfect-fourth financial-history-chart">
        </div>
        <div className="ui horizontal label financial-history-legend">Income</div>
        <div className="ui horizontal label financial-history-legend">Expediture</div>    
      </span>
    )
  };
};
