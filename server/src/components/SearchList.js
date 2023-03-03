import React, { Component } from 'react';

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const TOKEN = process.env.REACT_APP_TOKEN;

    fetch('https://learning.careers/version-test/api/1.1/obj/search', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then(response => response.json())
      .then(data => this.setState({ data: data.response.results }));
  }

  handleDeleteSearch = (_id) => {
    const TOKEN = process.env.REACT_APP_TOKEN;
    const confirmDelete = window.prompt("Type 'DELETE' to confirm:");
  
    if (confirmDelete === "DELETE") {
      fetch(`https://learning.careers/version-test/api/1.1/obj/search/${_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          const newData = this.state.data.filter(item => item._id !== _id);
          this.setState({ data: newData });
        })
        .catch(error => console.error(error));
    } else {
      console.log("Deletion cancelled.");
    }
  }

  render() {
    return (
      <div>
        <div className='searchContainer'>
          {this.state.data.map(item => (
            <div className='searches' key={item._id}>
              <p>Search ID: {item.searchId}</p>
              <p>Search Term: {item.term}</p>
              <p>Experience: {item.experience === "entryLevel" ? "Entry Level" : item.experience === "midLevel" ? "Mid Level"
               : item.experience === "seniorLevel" ? "Senior Level" : item.experience}</p>
              <p>Remote: {item.remote ? "Yes" : "No"}</p>
              <p>Location: {item.location}</p>
              <button onClick={() => this.handleDeleteSearch(item._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SearchList;
