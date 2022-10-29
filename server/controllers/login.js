const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const jwt = require("jsonwebtoken");

const loginHandler = (req, res) => {
  const { email, username, password } = req.body.user;
  User.findOne({ username: username }, (err, doc) => {
    if (err) {
      return res.status(500).json({ message: "Oops, something went wrong" });
    }

    if (!doc) {
      return res.status(404).json({ message: "Username not registered" });
    }

    bcrypt.compare(password, doc.password, (err, match) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Oops, something went wrong with your request" });
      }
      if (!match) {
        return res.status(403).json({ message: "Not Auth" });
      }

      let token = jwt.sign({ username }, `${process.env.TOKEN_SECRET}`, {
        expiresIn: "600s",
      });

      res.status(201).json({
        username: doc.username,
        bookmarkList: doc.bookmarkList,
        notes: doc.notes,
        token,
      });
    });
  });
  //
};

module.exports = { loginHandler };
