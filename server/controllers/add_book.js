const verificationHandler = require("../utils/jwtverify.config");
const { User } = require("../models/models");

const addBookController = (req, res) => {
  const username = req.params.username;
  const ticker = req.body.ticker;

  verificationHandler(req, res);

  try {
    User.find({ username: username }, async (err, doc) => {
      err && console.log(err);

      await doc[0].bookmarkList.unshift(ticker);

      await doc[0].save((err, updateUser) => {
        err ? console.log(err) : res.status(200).json(updateUser.bookmarkList);
      });
    });
  } catch {
    console.log("Invalid token");
  }
};

module.exports = { addBookController };
