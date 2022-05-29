// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying data to the client
// *********************************************************************************
const connectionCheck = require("../config/config");

module.exports = function (app) {
  app.get("/api/accounts", async (req, res) => {
    conn = await connectionCheck();
    conn.query("SELECT Id, Name FROM Account", (err, accounts) => {
      if (err) {
        console.log(err);
        res.status(404).send(err);
      }
      res.status(200).send(accounts);
    });
  });

  app.get("/api/account/:id", (req, res) => {
    conn.sobject("Account").retrieve(req.params.id, (err, account) => {
      if (err) {
        console.log(err);
        res
          .status(404)
          .send(`<h1> Invalid Request Made to api/account/:id endpoint </h1>`);
      }
      res.status(200).send(account);
    });
  });
};
