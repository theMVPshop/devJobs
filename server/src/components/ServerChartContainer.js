import React from "react";
import ServerChart from "./ServerChart";
import { executeScrape } from "../scraper/jobSearch";
export default class ServerChartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobData: [],
      loading: true,
      error: null,
      searchParams: {
        searchId: 1,
        cursor: 0,
        count: 100,
      },
    };
  }

  async componentDidMount() {
    await this.fetchJobData();
    executeScrape();
  }

  fetchJobData = async () => {
    const TOKEN = process.env.REACT_APP_TOKEN;
    const { searchId, cursor, count } = this.state.searchParams;

    try {
      const response = await fetch(
        `https://learning.careers/version-test/api/1.1/obj/jobData?searchId=${searchId}&cursor=${cursor}&count=${count}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      this.setState(
        (prevState) => ({
          jobData: [...prevState.jobData, ...data.response.results],
          loading: data.response.remaining > 0,
          searchParams: {
            ...prevState.searchParams,
            cursor:
              prevState.searchParams.cursor + prevState.searchParams.count,
          },
        }),
      );

      if (data.response.remaining > 0) {
        await this.fetchJobData();
      }
    } catch (error) {
      console.error(error);
      this.setState({ error: true, loading: false });
    }
  };

  render() {
    const { jobData, loading, error } = this.state;
    const filteredJobData = jobData.filter((data) => data.searchId === 1);

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
          {!loading && !error && <ServerChart jobData={filteredJobData} />}
        </div>
      </div>
    );
  }
}
