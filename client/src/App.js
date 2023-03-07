import React, { Component }  from 'react';
import './App.css';
import Navbar from './navbar';
import Bx1 from './bx1';
import Bx3 from './bx3';
import ChartContainer from './components/ChartContainer.js';

function App() {
  return (
    <div className="App">
      <section>
      <Navbar/>
      </section>


      <main className="main">
        
        <Bx1/>
        <ChartContainer/>
        <Bx3/>

      </main>

    </div>
  );
}

export default App
;