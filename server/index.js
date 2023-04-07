const express = require("express");
const { executeScrape } = require("./jobSearch.js");

const app = express();
const port = process.env.PORT || 3006;

app.get("/scrape", async (req, res) => {
  executeScrape();
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
