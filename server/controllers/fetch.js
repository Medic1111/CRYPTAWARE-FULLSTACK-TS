const axios = require("axios");

const fetchHandler = async (req, res) => {
  await axios
    .get(
      `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${req.params.ticker}&market=USD&apikey=${process.env.REACT_APP_API_KEY}`
    )
    .then((serverRes) => {
      if (serverRes.data["Error Message"]) {
        return res
          .status(404)
          .json({ message: "Invalid Ticker/Ticker not found" });
      } else {
        // let data = serverRes.data["Time Series Crypto (15min)"];
        let data = serverRes.data["Time Series (Digital Currency Daily)"];

        let structured = [];
        Object.keys(data).forEach((key) => {
          structured.push(data[key]);
        });
        return res.status(200).json(structured);
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Alphavantage let us down" })
    );
};

module.exports = { fetchHandler };
