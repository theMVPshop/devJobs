import React, { useState } from 'react';
import axios from 'axios';
import SavedSearchList from './SavedSearchList';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState('');
  const [experience, setExperience] = useState('');
  const [results, setResults] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.get(`http://localhost:3000/jobData?searchTerm=${searchTerm}&location=${location}&remote=${remote}&experience=${experience}`);

    setResults(response.data.response.results);
  };


  const handleSaveSearch = (event) => {
    event.preventDefault();

    // Add the current search parameters to the saved searches array
    setSavedSearches([
      ...savedSearches,
      {
        searchTerm,
        location,
        remote,
        experience,
      },
    ]);

    // Reset the form
    setSearchTerm('');
    setLocation('');
    setRemote('');
    setExperience('');
  };

  const handleEditSearch = (index) => {
    // Set the index of the saved search to edit
    setEditIndex(index);

    // Set the search parameters of the saved search to the form inputs
    const search = savedSearches[index];
    setSearchTerm(search.searchTerm);
    setLocation(search.location);
    setRemote(search.remote);
    setExperience(search.experience);
  };

  const handleRemoveSearch = (index) => {
    // Remove the saved search from the saved searches array
    const newSavedSearches = [...savedSearches];
    newSavedSearches.splice(index, 1);
    setSavedSearches(newSavedSearches);

    // Reset the form if the removed search was being edited
    if (editIndex === index) {
      setEditIndex(null);
      setSearchTerm('');
      setLocation('');
      setRemote('');
      setExperience('');
    }
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();

    // Update the saved search in the saved searches array
    const updatedSearch = {
      searchTerm,
      location,
      remote,
      experience,
    };
    const newSavedSearches = [...savedSearches];
    newSavedSearches[editIndex] = updatedSearch;
    setSavedSearches(newSavedSearches);

    // Reset the form
    setEditIndex(null);
    setSearchTerm('');
    setLocation('');
    setRemote('');
    setExperience('');
  };

  return (
    <div className="searchForm-container">
      <form className="searchForm" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search Term"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter experience"
          value={experience}
          onChange={(event) => setExperience(event.target.value)}
        />
        <div className="remoteContainer">
          <label>Remote:</label>
          <input
            type="checkbox"
            checked={remote}
            onChange={(event) => setRemote(event.target.checked)}
          />
        </div>
        <button type="submit">Search</button>
        <button onClick={handleSaveSearch}>Save Search</button>
        </form>
        {savedSearches.length > 0 && (
      <div className="saved-searches-container">
        <h3>Saved Searches</h3>
        <SavedSearchList
          savedSearches={savedSearches}
          handleEditSearch={handleEditSearch}
          handleRemoveSearch={handleRemoveSearch}
        />
      </div>
    )}        
      {editIndex !== null && (
        <form className="edit-form" onSubmit={handleSaveEdit}>
          <h3>Edit Saved Search</h3>
          <input
            type="text"
            placeholder="Search Term"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
          <input
            type="text"
            placeholder="Enter experience"
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
          />
          <div className="remoteContainer">
            <label>Remote:</label>
            <input
              type="checkbox"
              checked={remote}
              onChange={(event) => setRemote(event.target.checked)}
            />
          </div>
          <button type="submit">Save Edit</button>
          <button onClick={() => setEditIndex(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};
 
export default SearchForm;
