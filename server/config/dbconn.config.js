const mongoose = require("mongoose");

const db_connection = async () => {
  mongoose.connect(`${process.env.DB_URI}`, (err) =>
    err ? console.log(err) : console.log("DB CONNECTED")
  );
};

module.exports = db_connection;
