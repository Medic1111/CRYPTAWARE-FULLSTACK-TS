const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, require, unique },
  username: { type: String, require, unique },
  password: { type: String, require },
  bookmarkList: {
    type: [{ ticker: String, bookmarked: Boolean }],
    default: [],
  },
  notes: { type: [{ title: String, content: String }], default: [] },
});

const User = new mongoose.model("User", userSchema);

module.exports = { User };
