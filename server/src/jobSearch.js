const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const {executablePath} = require('puppeteer');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const Headers = fetch.Headers;
const FormData = require('form-data');


puppeteer.use(pluginStealth());
const launchOptions = {headless: true, executablePath: executablePath()};

async function getJobData(searchTerm, location, remote, experience, last24H) {
  const url = `https://www.indeed.com/jobs?q=${searchTerm}&l=${location}&sc=0kf%3A${remote}explvl%28${experience}%29%3B&radius=50${last24H}&vjk=2b9775de01edc6d0`;

  try {
      const browser = await puppeteer.launch(launchOptions);
      const page = await browser.newPage();
    
      await page.goto(url);
      await page.waitForTimeout(1000);
    
      const numberOfJobs = await page.evaluate(() => {
        const element = document.querySelector(".jobsearch-JobCountAndSortPane-jobCount span").innerText;
        let jobsNumber = element.replace(/[^0-9]/g, '');
        return jobsNumber;
      });
    
      await browser.close();
      return { numberOfJobs, timeStamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }) };
  } catch (error) {
      console.log(`Error scraping data: ${error}`);
      throw error;
  }
}

const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const last24H = '&fromage=1';

dotenv.config();
const TOKEN = process.env.TOKEN;

//fetch request for search data
fetch('https://learning.careers/version-test/api/1.1/obj/search', requestOptions)
  .then(response => response.json())
  .then(results => {
    const searchData = results.response.results;
    searchData.forEach((searchData) => {
      let searchTerm = searchData.term;
      let location = searchData.location;
      let remote = searchData.remote;
      let experience = searchData.experience;
      let searchId = searchData.searchId;

      if(experience === 'entryLevel') {
        experience = 'ENTRY_LEVEL';
      } else if(experience === 'midLevel') {
        experience = 'MID_LEVEL';
      } else {
        experience = 'SENIOR_LEVEL';
      }

      if(remote === true) {
        remote = 'attr%28DSQF7%29'; //this is the text needed for remote a job search
      }else {
        remote = '';
      }

      try {
        // calls scraper function
        getJobData(searchTerm, location, remote, experience, last24H)
          .then(jobData => {
            const timeStamp = jobData.timeStamp;
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${TOKEN}`);

            const formdata = new FormData();
            formdata.append("jobValue", jobData.numberOfJobs);
            formdata.append("searchDate", timeStamp);
            formdata.append("searchId", searchId);

            const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: formdata,
              redirect: 'follow'
            };

            // fetch request to post jobData
            fetch("https://learning.careers/version-test/api/1.1/obj/jobData", requestOptions)
              .then(response => response.text())
              .then(result => {
                console.log(result);
              })
              .catch(error => {
                console.log('Error posting jobData:', error);
              });
          })
          .catch(error => {
            console.log('Error getting jobData:', error);
          });
      } catch (error) {
        console.log('Unexpected error:', error);
      }
    });
  })
  .catch(error => {
    console.log('Error fetching search data:', error);
});
