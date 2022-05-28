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
const conn = new jsforce.Connection({
  loginURL: SF_LOGIN_URL,
});
conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, userInfo) => {
  if (err) {
    return console.error(err);
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

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("./public"));

// Routes
// =============================================================
require("./routes/html-routes")(app);
app.get("/api/accounts", (req, res) => {
  conn.query("SELECT Id, Name FROM Account", (err, accounts) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send(accounts);
  });
});
app.get("/api/account/:id", (req, res) => {
  conn.sobject("Account").retrieve(req.params.id, (err, account) => {
    if (err) {
      res
        .status(404)
        .send(`<h1> Invalid Request Made to api/account/:id endpoint </h1>`);
    }
    res.status(200).send(account);
  });
});

// Server up
app.listen(PORT, () => {
  console.log(`server is now listening at http:localhost:${PORT}`);
});
