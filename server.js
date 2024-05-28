require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 3200;

const dbConfig = require("./config/dbConfig");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running...");
});

// -------------------------------- ROUTES -----------------------------------------------------//
// MASTERS //
app.use("/cities", require("./controllers/CitiesController"));
app.use("/user-accounts", require("./controllers/UserAccountsController"));

// PURCHASING //

app.listen(port, () => console.log(`Api is running on port# ${port}`));
