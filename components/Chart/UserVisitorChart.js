import React, { Component } from "react";
import Chart from "react-apexcharts";

class UserVisitorChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              if (value) {
                return value.toFixed(2) + " %";
              } else {
                if (value == 0) {
                  return 0 + " %";
                }
              }
            },
          },
          // max: this.state.ymax,
          // min: this.state.ymin,
        },
        xaxis: {
          categories: props.label
        }
      },
      series: [
        {
          name: "series-1",
          data: props.series
        }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserVisitorChart;
