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
    const chartData = this.props.chartData;

    function generateLabels (obj) {
      const financialYear = obj;
      const date = new Date(financialYear);
      return date.getFullYear().toString;
    };

    function generateIncomeSeries(obj){};
    function generateExpenditureSeries(obj){};

    let chart = new Chartist.Bar('.financial-history-chart', {
      labels: chartData.map(generateLabels),
      series: [chartData.map(generateIncomeSeries), chartData.map(generateExpenditureSeries)]
      ]
    }, {
      seriesBarDistance: 10,
      axisX: {
        offset: 60
      },
      axisY: {
        offset: 80,
        labelInterpolationFnc: function(value) {
          return value + ' CHF'
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
      const barChart = document.querySelectorAll('.income-chart .ct-slice-pie');
      let legendLabels = document.querySelectorAll('.income-legend');
      barChart.forEach(function(bar, index) {
        bar.style.fill = colours[index];
        legendLabels[index].style.backgroundColor = colours[colours.length - index - 1];
      });
    }, 15);

  }

  componentWillMount() {
  };

  componentDidMount() {
    this.renderChart();
    // this.setColours();
  };

  render() {

    return (
      <div className="image ct-chart ct-perfect-fourth financial-history-chart">
      </div>
    )
  };
};
