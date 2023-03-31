import React, { createRef, Component } from "react";
import Chart from "chart.js/auto";

export default class ServerChart extends Component {
  constructor(props) {
    super(props);
    this.chartContainer = createRef();
    this.daysToDisplay = 30;
  }

  componentDidMount() {
    setTimeout(() => {
      this.renderChart();
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.jobData !== prevProps.jobData) {
      setTimeout(() => {
        this.renderChart();
      });
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  renderChart() {
    if (
      this.chartContainer.current &&
      Array.isArray(this.props.jobData) &&
      this.props.jobData.length > 0
    ) {
      const chartConfig = {
        type: "line",
        data: {
          labels: this.props.jobData
            .slice(-this.daysToDisplay)
            .map((data) => {
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

      if (this.chart) {
        this.chart.data = chartConfig.data;
        this.chart.update();
      } else {
        this.chart = new Chart(this.chartContainer.current, chartConfig);
      }
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
