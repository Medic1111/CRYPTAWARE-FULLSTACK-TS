const axios = require("axios");

const newsHandler = async (req, res) => {
  await axios
    .get(
      `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=COIN,CRYPTO:BTC,FOREX:USD&limit=50&apikey=${process.env.REACT_APP_API_KEY}`
    )
    .then((serverRes) => {
      res.status(200).json(serverRes.data.feed);
    })
    .catch((err) => {
      res.status(500).json({ message: "Alphavantage let us down..." });
    });
};

module.exports = { newsHandler };
