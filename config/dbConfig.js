const mongoose = require("mongoose");

const connect = mongoose.connect(process.env.MONGO_URI, {
  dbName: "qarhami-v1",
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MONGO DB CONNECTED...");
});

connection.on("error", () => {
  console.log("ERROR IN MONGO DB CONNECTED...");
});

module.exports = mongoose;
