import React, { useState, useEffect, useContext } from "react";
import JobsChart from "./JobsChart.js";
import { JobDataContext } from "../JobDataContext";

export default function ChartContainer() {
  const { jobData, setJobData, setPercentageIncrease } =
    useContext(JobDataContext);
  const [data, setData] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [remotes, setRemotes] = useState([]);
  const [terms, setTerms] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useState({
    experience: "entryLevel",
    remote: "true",
    term: "javascript",
    location: "USA",
  });
  const [loading, setLoading] = useState(false);
  const TOKEN = process.env.REACT_APP_TOKEN;

  const fetchAndFilterData = async () => {
    setLoading(true);
    setError(false);

    const filteredResults = data.filter((item) => {
      const hasExperience = searchParams.experience
        ? item.experience === searchParams.experience
        : true;
      const hasRemote = searchParams.remote
        ? item.remote === (searchParams.remote === "true")
        : true;
      const hasTerm = searchParams.term
        ? item.term === searchParams.term
        : true;
      const hasLocation = searchParams.location
        ? item.location === searchParams.location
        : true;

      return hasExperience && hasRemote && hasTerm && hasLocation;
    });

    if (filteredResults.length > 0) {
      const selectedResult = filteredResults[0];
      const searchId = selectedResult.searchId;

      let cursor = 0;
      const jobDataResponse = [];
      do {
        const response = await fetch(
          `https://learning.careers/version-test/api/1.1/obj/jobData?searchId=${searchId}&cursor=${cursor}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        const filteredJobData = data.response.results.filter(
          (job) => job.searchId === searchId
        );
        jobDataResponse.push(...filteredJobData);

        if (data.response.remaining > 0) {
          cursor += data.response.count;
        } else {
          cursor = null;
        }
      } while (cursor !== null);
      setJobData(jobDataResponse);
    } else {
      setError(true);
      console.error("No data available.");
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://learning.careers/version-test/api/1.1/obj/search", {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.response.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (data) {
      fetchAndFilterData();

      const experiencesSet = new Set();
      const remotesSet = new Set();
      const termsSet = new Set();
      const locationsSet = new Set();

      data.forEach((item) => {
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      [name]: value,
    }));
  };

  useEffect(() => {
    setJobData([]);
  }, [searchParams]);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);

    const filteredResults = data.filter((item) => {
      const hasExperience = searchParams.experience
        ? item.experience === searchParams.experience
        : true;
      const hasRemote = searchParams.remote
        ? item.remote === (searchParams.remote === "true")
        : true;
      const hasTerm = searchParams.term
        ? item.term === searchParams.term
        : true;
      const hasLocation = searchParams.location
        ? item.location === searchParams.location
        : true;

      return hasExperience && hasRemote && hasTerm && hasLocation;
    });

    if (filteredResults.length > 0) {
      const selectedResult = filteredResults[0];
      const searchId = selectedResult.searchId;

      let cursor = 0;
      const jobDataResponse = [];
      do {
        const response = await fetch(
          `https://learning.careers/version-test/api/1.1/obj/jobData?searchId=${searchId}&cursor=${cursor}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        const filteredJobData = data.response.results.filter(
          (job) => job.searchId === searchId
        );
        jobDataResponse.push(...filteredJobData);

        if (data.response.remaining > 0) {
          cursor += data.response.count;
        } else {
          cursor = null;
        }
      } while (cursor !== null);
      setJobData(jobDataResponse);
    } else {
      setError(true);
      console.error("No data available.");
    }
    setLoading(false);
  };

  return (
    <div className="chartBox">
      <form onSubmit={handleSearch}>
        <label htmlFor="experience">Experience:</label>
        <select
          name="experience"
          id="experience"
          value={searchParams.experience}
          onChange={handleInputChange}
        >
          <option value="">Select Experience</option>
          {experiences.map((experience) => (
            <option key={experience} value={experience}>
              {experience === "entryLevel"
                ? "Entry Level"
                : experience === "midLevel"
                ? "Mid Level"
                : experience === "seniorLevel"
                ? "Senior Level"
                : experience}
            </option>
          ))}
        </select>

        <label htmlFor="remote">Remote:</label>
        <select
          name="remote"
          id="remote"
          value={searchParams.remote}
          onChange={handleInputChange}
        >
          <option value="">Select Remote</option>
          {remotes.map((remote) => (
            <option key={remote} value={remote}>
              {remote ? "Yes" : "No"}
            </option>
          ))}
        </select>

        <label htmlFor="term">Term:</label>
        <select
          name="term"
          id="term"
          value={searchParams.term}
          onChange={handleInputChange}
        >
          <option value="">Select Term</option>
          {terms.map((term) => (
            <option key={term} value={term}>
              {term}
            </option>
          ))}
        </select>

        <label htmlFor="location">Location:</label>
        <select
          name="location"
          id="location"
          value={searchParams.location}
          onChange={handleInputChange}
        >
          <option value="">Select Location</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        <button type="submit">Search</button>
      </form>

      {error && <p>No data available.</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <JobsChart
          jobData={jobData}
          onPercentageChange={setPercentageIncrease}
        />
      )}
    </div>
  );
}
