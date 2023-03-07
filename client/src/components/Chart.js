import React, { useState, useEffect } from 'react';

export default function Chart() {
  const [data, setData] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [remotes, setRemotes] = useState([]);
  const [terms, setTerms] = useState([]);
  const [locations, setLocations] = useState([]);

  const TOKEN = process.env.REACT_APP_TOKEN;

  useEffect(() => {
    fetch('https://learning.careers/version-test/api/1.1/obj/search', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setData(data.response.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (data) {
      const experiencesSet = new Set();
      const remotesSet = new Set();
      const termsSet = new Set();
      const locationsSet = new Set();

      data.forEach(item => {
        experiencesSet.add(item.experience);
        remotesSet.add(item.remote);
        termsSet.add(item.term);
        locationsSet.add(item.location);
      });

      setExperiences(Array.from(experiencesSet));
      setRemotes(Array.from(remotesSet));
      setTerms(Array.from(termsSet));
      setLocations(Array.from(locationsSet));
    }
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleSearch = event => {
    event.preventDefault();
    //code for rendering graph
  };

  return (
    <form className='bx bx2' onSubmit={handleSearch}>
      <label>
        Experience:
        <select name="experience">
          {experiences.map(experience => (
            <option key={experience} value={experience}>{experience}</option>
          ))}
        </select>
      </label>
      <label>
        Remote:
        <select name="remote">
          {remotes.map(remote => (
            <option key={remote} value={remote}>{remote.toString()}</option>
          ))}
        </select>
      </label>
      <label>
        Term:
        <select name="term">
          {terms.map(term => (
            <option key={term} value={term}>{term}</option>
          ))}
        </select>
      </label>
      <label>
        Location:
        <select name="location">
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </label>
      <button type="submit">Search</button>
    </form>
  );
}
