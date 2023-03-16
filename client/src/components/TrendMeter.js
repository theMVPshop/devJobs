import React, { useContext } from "react";
import { JobDataContext } from "../JobDataContext";

export default function TrendMeter() {
  const { percentageIncrease } = useContext(JobDataContext);

  const minRotation = 125;
  const maxRotation = 50; 
  const rotationAngle = 360 + (percentageIncrease);
  const gaugeStyle = {
    transform: `rotate(${rotationAngle}deg)`,
  };

  return (
    <div>
      <div className="trendBox bx bx1">
        <h2 className="trendTitle">Job Trend</h2>

        <img
          className="gauge"
          src="https://assets.codepen.io/1240556/pointer.png"
          alt=""
          style={gaugeStyle}
        />

        <div className="trendData">
          <span className="percent">{percentageIncrease}%</span>
          <br />
          <span className="delta">Increase</span> in the
          <br />
          last 30 days
        </div>
      </div>
    </div>
  );
}
