import React from 'react';
import SearchBar from './components/SearchBar.js';
import SearchList from './components/SearchList.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 id='header'>Current Available Searches</h1>
      <SearchBar />
      <SearchList />
    </div>
  );
}

export default App;