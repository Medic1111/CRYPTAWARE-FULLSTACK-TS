const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required },
  username: { type: String },
  password: { type: String },
  tickerList: { type: [{ ticker: String, bookmarked: Boolean }], default: [] },
  notes: { type: [{ title: String, content: String }], default: [] },
});

const User = new mongoose.model("User", userSchema);

export default { User };
