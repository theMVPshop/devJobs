
import Chart from "chart.js/auto";

const arrays = [
  { day: 01, count: 10 },
  { day: 02, count: 20 },
  { day: 03, count: 15 },
  { day: 04, count: 25 },
  { day: 05, count: 22 },
  { day: 06, count: 30 },
  { day: 07, count: 28 },
  { day: 08, count: 10 },
  { day: 09, count: 20 },
  { day: 10, count: 15 },
  { day: 11, count: 25 },
  { day: 12, count: 22 },
  { day: 13, count: 30 },
  { day: 14, count: 28 },
  { day: 15, count: 10 },
  { day: 16, count: 20 },
  { day: 17, count: 15 },
  { day: 18, count: 25 },
  { day: 19, count: 22 },
  { day: 20, count: 30 },
  { day: 21, count: 28 },
  { day: 22, count: 10 },
  { day: 23, count: 20 },
  { day: 24, count: 15 },
  { day: 25, count: 25 },
  { day: 26, count: 22 },
  { day: 27, count: 30 },
  { day: 28, count: 60 },
  { day: 29, count: 28 },
  { day: 30, count: 28 },
  { day: 31, count: 28 },
];
// when data is available i can grab it as an array like the one above
// if i want the chart to be responsive the parent container has to be relativley positioned and dedicated to the chart only!
// tps://learning.careers/version-test/api/1.1/obj/jobData?constraints=[%20{%20"key":%20"searchId",%20"constraint_type":%20"equals",%20"value":%20"3"%20}%20,{"key":"searchDate","constraint_type":"greater%20than","value":"2022-11-15T06:00:00.000Z"}]
// https://learning.careers/version-test/api/1.1/obj/jobData?constraints=[{%22key%22:%22searchId%22,%22constraint_type%22:%22equals%22,%22value%22:%223%22},{%22key%22:%22searchDate%22,%22constraint_type%22:%22greater%20than%22,%22value%22:%222022-11-15T06:00:00.000Z%22}]
// loop through data if found on day increment on that day
// loop within a loop one going over testdata 2nd loop going over array finding day

(async function() {
    const data = arrays;
  
    new Chart(
      document.getElementById('acquisitions'),
      {
        type: 'line',
        data: {
          labels: data.map(row => row.day),
          datasets: [
            {
              label: 'Jobs posted per day',
              data: data.map(row => row.count)
            }
          ]
        },
        options: {
          scales: {
            x: {
              title: {
                display:true,
                text:"Day",
                align:'center'
              }
            },
            y: {
              title: {
                display:true,
                text:'# of Jobs',
                align:'center'
              }
            }
          }
        }
      }
    );
  })();
  // npm run dev, then ctrl+click on the blue link in terminal to see the chart