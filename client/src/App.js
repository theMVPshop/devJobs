import React from 'react';
import './App.css';
import Navbar from './navbar';
import TrendMeter from './components/TrendMeter';
import ChartContainer from './components/ChartContainer.js';
import TopMarkets from './components/TopMarkets';
import { JobDataProvider } from './JobDataContext';

function App() {
  return (
    <div className="App">
      <section>
        <Navbar/>
      </section>

      <main className="main">
        <JobDataProvider>
          <TrendMeter />
          <ChartContainer/>
          <TopMarkets />
        </JobDataProvider>
      </main>
    </div>
  );
}

export default App;
