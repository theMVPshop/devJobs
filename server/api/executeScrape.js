const { executeScrape } = require('../jobSearch');

async function executeScrape() {
    try {
      const response = await fetch(
        "https://learning.careers/version-test/api/1.1/obj/search",
        requestOptions
      );
      const searchData = await response.json();
      searchData.response.results.forEach(async (searchData) => {
        let searchTerm = searchData.term;
        let location = searchData.location;
        let remote = searchData.remote;
        let experience = searchData.experience;
        let searchId = searchData.searchId;
  
        if (experience === "entryLevel") {
          experience = "ENTRY_LEVEL";
        } else if (experience === "midLevel") {
          experience = "MID_LEVEL";
        } else {
          experience = "SENIOR_LEVEL";
        }
  
        if (remote === true) {
          remote = "attr%28DSQF7%29"; //this is the text needed for remote a job search
        } else {
          remote = "";
        }
  
        try {
          // calls scraper function
          const jobData = await getJobData(
            searchTerm,
            location,
            remote,
            experience,
            last24H
          );
          const timeStamp = jobData.timeStamp;
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${TOKEN}`);
  
          const formdata = new FormData();
          formdata.append("jobValue", jobData.numberOfJobs);
          formdata.append("searchDate", timeStamp);
          formdata.append("searchId", searchId);
  
          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
          };
  
          // fetch request to post jobData
          const postResponse = await fetch(
            "https://learning.careers/version-test/api/1.1/obj/jobData",
            requestOptions
          );
  
          const postResult = await postResponse.text();
          console.log(postResult);
        } catch (error) {
          console.log("Error:", error);
        }
      });
    } catch (error) {
      console.log("Error fetching search data:", error);
    }
  }
  

  module.exports = async (req, res) => {
    try {
      await executeScrape();
      res.status(200).send('Scrape on Vercel');
    } catch (error) {
      res.status(500).send('Error: ' + error.message);
    }
  };