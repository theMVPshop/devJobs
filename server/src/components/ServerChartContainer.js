import React from "react";
import ServerChart from "./ServerChart";

export default class ServerChartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobData: [],
      loading: true,
      error: false,
      searchParams: {
        searchId: 1,
        cursor: 0,
        count: 100,
      },
    };
    this.fetchJobData = this.fetchJobData.bind(this);
  }

  componentDidMount() {
    this.fetchJobData();
  }

  fetchJobData() {
    const TOKEN = process.env.REACT_APP_TOKEN;
    const { searchId, cursor, count } = this.state.searchParams;

    fetch(
      `https://learning.careers/version-test/api/1.1/obj/jobData?searchId=${searchId}&cursor=${cursor}&count=${count}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const { jobData } = this.state;
        const newJobData = jobData.concat(data.response.results);
        const remaining = data.response.remaining;

        if (remaining > 0) {
          this.setState(
            {
              jobData: newJobData,
              loading: true,
              searchParams: {
                ...this.state.searchParams,
                cursor: cursor + count,
              },
            },
            () => this.fetchJobData(),
          );
        } else {
          this.setState({ jobData: newJobData, loading: false });
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error: true, loading: false });
      });
  }

  render() {
    const { jobData, loading, error } = this.state;
    return (
      <div className="chartHeaderContainer">
        <div className="chartHeader">
          <h2>Experience: Entry Level</h2>
          <h2>Remote: Yes</h2>
          <h2>Language: Javascript</h2>
          <h2>Location: United States</h2>
        </div>

        <div className="serverChartContainer">
          {loading && <p>Loading...</p>}
          {error && <p>Error fetching data.</p>}
          {!loading && !error && <ServerChart jobData={jobData} />}
        </div>
      </div>
    );
  }
}
