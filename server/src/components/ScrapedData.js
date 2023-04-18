import React from "react";

export default class ScrapedData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobData: null,
    };
  }

  componentDidMount() {
<<<<<<< HEAD
    fetch("https://dev-jobs-server-3rrh0di4l-themvpshop.vercel.app/scrape")
=======
    fetch("https://dev-jobs-server.vercel.app/scrape")
>>>>>>> 63153c1760404e33b2ceee378831312659d884c0
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


