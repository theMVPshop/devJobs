import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import ServerChartContainer from "./components/ServerChartContainer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chart" element={<ServerChartContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;