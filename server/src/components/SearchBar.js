import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      experience: 'entryLevel',
      remote: true,
      location: ''
    };
  }

  

  handleTermChange = (event) => {
    this.setState({ term: event.target.value });
  };

  handleExperienceChange = (event) => {
    this.setState({ experience: event.target.value });
  };

  handleRemoteChange = (event) => {
    this.setState({ remote: event.target.value === "true" });
  };

  handleLocationChange = (event) => {
    this.setState({ location: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const TOKEN = process.env.REACT_APP_TOKEN;
    const { term, experience, remote, location } = this.state;
  
    fetch(`https://learning.careers/version-test/api/1.1/obj/search?term=${term}&experience=${experience}&remote=${remote}&location=${location}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.response && data.response.results.length) {
        let count = data.response.results.length;
        const searchId = data.response.results.length + 1;
  
        fetch('https://learning.careers/version-test/api/1.1/obj/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
          },
          body: JSON.stringify({
            term,
            experience,
            remote,
            location,
            searchId
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          const result = {
            "experience": experience,
            "remote": remote,
            "term": term,
            "location": location,
            "searchId": searchId
          };
          if (data.response && data.response.results) {
            data.response.results.push(result);
            count = count + 1;
            console.log('New response:', data.response);
          } else {
            console.error('Error: invalid response format');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      } else {
        console.error('Error: invalid response format');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  

  render() {
    return (
      <form className='searchBar' onSubmit={this.handleSubmit}>
        <label>
          Search Term:
          <input type="text" value={this.state.term} onChange={this.handleTermChange} />
        </label>
        <label>
          Experience: 
          <select value={this.state.experience} onChange={this.handleExperienceChange}>
            <option value="entryLevel">Entry Level</option>
            <option value="midLevel">Intermediate Level</option>
            <option value="seniorLevel">Senior Level</option>
          </select>
        </label>
        <label>
          Remote:
          <select value={this.state.remote} onChange={this.handleRemoteChange}>
            <option value="true">Remote</option>
            <option value="false">Not remote</option>
          </select>
        </label>
        <label>
          Location:
          <input type="text" value={this.state.location} onChange={this.handleLocationChange} />
        </label>
        <button type="submit">Post</button>
      </form>
    );
  }
}

export default SearchBar;