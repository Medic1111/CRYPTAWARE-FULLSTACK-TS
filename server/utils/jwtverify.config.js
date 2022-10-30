const jwt = require("jsonwebtoken");

const verificationHandler = (req, res) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "No token found" });
  } else {
    jwt.verify(token, `${process.env.TOKEN_SECRET}`, (err, verified) => {
      if (err) {
        console.log("Hitting here");
        console.log(err);
        return res
          .status(401)
          .json({ message: "Not Auth....Invalid or Expired Token" });
      }
      console.log("Token validated");
    });
  }
};

module.exports = verificationHandler;
