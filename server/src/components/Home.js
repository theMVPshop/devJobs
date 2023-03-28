import React from "react";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";

const Home = () => {
  return (
    <div>
      <h1 id="header">Current Available Searches</h1>
      <SearchBar />
      <SearchList />
    </div>
  );
};

export default Home;
