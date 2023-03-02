// import trend from './pointer.png';
import React, { Component }  from 'react';

const Bx1 = () => {
  return ( 
<div >
<div className="trendBox">
  <h2 className="trendTitle"> Job Trends</h2>

  <img className="gauge"  src="https://assets.codepen.io/1240556/pointer.png" alt="" />

  <div className="trendData">
    <span className="percent">0%</span>
    <br></br>
    <span className="delta">Increase </span> 
     in the
    <br></br>
    last 30 days 
    </div>

</div>
<input type="range" min="-50" max="50" value="0" className="slider myRange"/>
</div>
   );
}
 
export default Bx1 ;