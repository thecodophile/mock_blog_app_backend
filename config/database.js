const mongoose = require("mongoose");
require("dotenv").config;

const connectWithDb = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connection is successful");
    })
    .catch((err) => {
      console.log("Issue in DB connection");
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectWithDb;
