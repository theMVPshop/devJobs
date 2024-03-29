import React from "react";

export default class ScrapedData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobData: null,
    };
  }

  componentDidMount() {
    fetch("/scrape")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ jobData: data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div></div>
    )
  }
}


