import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

export default function JobsChart({ jobData }) {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current && jobData) {
      const chartConfig = {
        type: "line",
        data: {
          labels: jobData[0].map((data) => data.searchDate),
          datasets: [
            {
              label: "Job Data",
              data: jobData[0].map((data) => data.jobValue),
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
      };

      const chart = new Chart(chartContainer.current, chartConfig);

      return () => {
        chart.destroy();
      };
    }
  }, [jobData]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};
