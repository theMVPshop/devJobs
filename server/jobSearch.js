const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
// const {executablePath} = require('puppeteer-core');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const Headers = fetch.Headers;
const FormData = require('form-data');
let chrome ={};
let puppeteerRequire;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteerRequire = require("puppeteer-core");
} else {
  puppeteerRequire = require("puppeteer");
}

puppeteer.use(pluginStealth());

async function getJobData(searchTerm, location, remote, experience, last24H) {
  const url = `https://www.indeed.com/jobs?q=${searchTerm}&l=${location}&sc=0kf%3A${remote}explvl%28${experience}%29%3B&radius=50${last24H}&vjk=2b9775de01edc6d0`;
  const launchOptions = {};
  
  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    launchOptions = {
      headless: true, 
      ignoreHTTPSErrors: true,
      defaultViewport: chrome.devaultViewport,
      executablePath: await chrome.executablePath,
    };
  };
  
  try {
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForTimeout(1000);

    const numberOfJobs = await page.evaluate(() => {
      const element = document.querySelector(
        ".jobsearch-JobCountAndSortPane-jobCount span"
      ).innerText;
      let jobsNumber = element.replace(/[^0-9]/g, "");
      return jobsNumber;
    });

    await browser.close();
    return {
      numberOfJobs,
      timeStamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };
  } catch (error) {
    console.log(`Error scraping data: ${error}`);
    throw error;
  }
}

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const last24H = "&fromage=1";

dotenv.config();
const TOKEN = process.env.TOKEN;

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

module.exports = {
  executeScrape,
};
