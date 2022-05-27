// Dependencies
// =============================================================
const express = require("express");
const jsforce = require("jsforce");

const dotenv = require("dotenv");
const config = dotenv.config;
config();

// const fs = require("fs");

const { SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN } = process.env;

// init sf connection and login
const connection = new jsforce.Connection({
  loginURL: SF_LOGIN_URL,
});
connection.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, userInfo) => {
  if (err) {
    console.error(err);
  } else {
    console.log(
      `login successful for user id: ${userInfo.id} on organization id: ${userInfo.organizationId}`
    );
  }
});

// Express app
// =============================================================
const PORT = process.env.PORT || 8080;
const app = express();

// Routes
// =============================================================
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`server is now listening at http:localhost:${PORT}`);
});
