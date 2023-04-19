const { executeScrape } = require('../jobSearch');

module.exports = async (req, res) => {
  try {
    await executeScrape();
    res.status(200).send('Scrape on Vercel');
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
};