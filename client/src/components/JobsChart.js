import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

export default function JobsChart({ jobData }) {
  const chartContainer = useRef(null);
  const daysToDisplay = 30;

  useEffect(() => {
    if (chartContainer && chartContainer.current && Array.isArray(jobData) && jobData.length > 0) {
      console.log(jobData.slice(-daysToDisplay));

      const chartConfig = {
        type: "line",
        data: {
          labels: jobData.slice(-daysToDisplay).map((data) => {
            const date = new Date(data.searchDate);
            return date.toLocaleDateString();
          }),
          datasets: [
            {
              label: "Job Data",
              data: jobData.slice(-daysToDisplay).map((data) => data.jobValue),
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
      {Array.isArray(jobData) && jobData.length > 0 ? (
        <canvas ref={chartContainer} />
      ) : (
        <p>No job data available</p>
      )}
    </div>
  );
};
