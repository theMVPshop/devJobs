import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

export default function JobsChart({ jobData, onPercentageChange }) {
  const chartContainer = useRef(null);
  const daysToDisplay = 30;

  function calculatePercentageIncrease() {
    if (jobData.length < 2) {
      return 0;
    }
  
    const startValue = jobData[jobData.length - daysToDisplay]?.jobValue || jobData[0]?.jobValue;
    const endValue = jobData[jobData.length - 1]?.jobValue;
  
    if (startValue === 0 && endValue === 0) {
      return 0;
    }
  
    if (startValue === 0) {
      return 100;
    }
  
    const percentageIncrease = Math.round(((endValue - startValue) / Math.abs(startValue)) * 100)
    return percentageIncrease;
  }

  useEffect(() => {
    if (chartContainer && chartContainer.current && Array.isArray(jobData) && jobData.length > 0) {
      const newPercentage = calculatePercentageIncrease();
      onPercentageChange(newPercentage);

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
  }, [jobData, onPercentageChange]);

  return (
    <div>
      {Array.isArray(jobData) && jobData.length > 0 ? (
        <canvas ref={chartContainer} />
      ) : (
        <p>No job data available</p>
      )}
    </div>
  );
}