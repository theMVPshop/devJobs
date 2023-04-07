import React, { useContext } from "react";
import { JobDataContext } from "../JobDataContext";

export default function TrendMeter() {
  const { percentageIncrease } = useContext(JobDataContext);

  const minRotation = -50;
  const maxRotation = 230;
  const rotationRange = maxRotation - minRotation;
  const percentageRange = Math.min(Math.max(percentageIncrease, 0), 100);
  const rotationAngle = minRotation + (rotationRange * (percentageRange / 100));

  const gaugeStyle = {
    transform: `rotate(${rotationAngle}deg) scaleX(-1)`,
  };

  return (
    <div className="trendBox bx bx1">
      <h2 className="trendTitle">Job Trend</h2>

      <img className="gauge" src="https://assets.codepen.io/1240556/pointer.png" alt="" style={gaugeStyle} />

      <div className="trendData">
        <span className="percent">{percentageIncrease}%</span><br />
        <span className="delta">Increase</span> in the <br /> last 30 days
      </div>
    </div>
  );
}
