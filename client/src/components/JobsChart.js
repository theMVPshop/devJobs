import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

export default function JobsChart({ jobData }) {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current && jobData && jobData.length > 0) {
      const chartConfig = {
        type: "line",
        data: {
          labels: jobData[0].slice(0, 30).map((data) => {
            const date = new Date(data.searchDate);
            return date.toLocaleDateString();
          }),
          datasets: [
            {
              label: "Job Data",
              data: jobData[0].slice(0, 30).map((data) => data.jobValue),
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
      {jobData && jobData.length > 0 ? (
        <canvas ref={chartContainer} />
      ) : (
        <p>No job data available</p>
      )}
    </div>
  );
};
