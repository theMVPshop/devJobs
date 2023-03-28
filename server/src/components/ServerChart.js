import React, { createRef, Component } from "react";
import Chart from "chart.js/auto";

export default class ServerChart extends Component {
  constructor(props) {
    super(props);
    this.chartContainer = createRef();
    this.daysToDisplay = 30;
  }

  componentDidMount() {
    if (
      this.chartContainer &&
      this.chartContainer.current &&
      Array.isArray(this.props.jobData) &&
      this.props.jobData.length > 0
    ) {
      const chartConfig = {
        type: "line",
        data: {
          labels: this.props.jobData.slice(-this.daysToDisplay).map((data) => {
            const date = new Date(data.searchDate);
            return date.toLocaleDateString();
          }),
          datasets: [
            {
              label: "Jobs Posted",
              data: this.props.jobData
                .slice(-this.daysToDisplay)
                .map((data) => data.jobValue),
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
      };

      this.chart = new Chart(this.chartContainer.current, chartConfig);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.chartContainer &&
      this.chartContainer.current &&
      Array.isArray(this.props.jobData) &&
      this.props.jobData.length > 0 &&
      this.props.jobData !== prevProps.jobData
    ) {
      const chartConfig = {
        type: "line",
        data: {
          labels: this.props.jobData.slice(-this.daysToDisplay).map((data) => {
            const date = new Date(data.searchDate);
            return date.toLocaleDateString();
          }),
          datasets: [
            {
              label: "Job Data",
              data: this.props.jobData
                .slice(-this.daysToDisplay)
                .map((data) => data.jobValue),
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
      };

      this.chart.data = chartConfig.data;
      this.chart.update();
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  render() {
    const { jobData } = this.props;
    return (
      <div>
        {Array.isArray(jobData) && jobData.length > 0 && (
          <canvas ref={this.chartContainer} />
        )}
      </div>
    );
  }
}
