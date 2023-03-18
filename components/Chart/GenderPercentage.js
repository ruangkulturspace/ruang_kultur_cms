import React, { Component } from "react";
import Chart from "react-apexcharts";

class GenderPercentage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: 'pie',
        },
        labels: props.label,
      },
      series: props.series,
      // labels: props.label
    };
  }

  render() {
    return (
      <div className="donut">
        <Chart options={this.state.options} series={this.state.series} type="donut" />
      </div>
    );
  }
}

export default GenderPercentage;
