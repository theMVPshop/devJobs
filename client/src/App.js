import React, { Component }  from 'react';
import './App.css';
import Navbar from './navbar';
import Bx1 from './bx1';
import Bx3 from './bx3';
import Chart from './components/Chart.js';

function App() {
  return (
    <div className="App">
      <section>
      <Navbar/>
      </section>


      <main className="main">
        
        <Bx1/>
        <Chart/>
        <Bx3/>

      </main>

    </div>
  );
}

export default App
;