// Dependencies
// =============================================================
const express = require("express");
const jsforce = require("jsforce");
// const morgan = require("morgan");

const dotenv = require("dotenv");
const config = dotenv.config;
config();

// Express app
// =============================================================
const PORT = process.env.PORT || 8080;
const app = express();

// Logger Middleware
// app.use(morgan());

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("./public"));

// Routes
// =============================================================
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// app.get("/api/accounts", (req, res) => {
//   conn.query("SELECT Id, Name FROM Account", (err, accounts) => {
//     if (err) {
//       res.status(404).send(err);
//     }
//     res.status(200).send(accounts);
//   });
// });
// app.get("/api/account/:id", (req, res) => {
//   conn.sobject("Account").retrieve(req.params.id, (err, account) => {
//     if (err) {
//       res
//         .status(404)
//         .send(`<h1> Invalid Request Made to api/account/:id endpoint </h1>`);
//     }
//     res.status(200).send(account);
//   });
// });

// Error Handling route for unknown endpoints
app.use((req, res, next) => {
  const err = new Error("Page Not Found!");
  err.status = 404;
  next(err);
});

// Catch global errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    err: {
      message: err.message,
    },
  });
});

// Server up
app.listen(PORT, () => {
  console.log(`server is now listening at http:localhost:${PORT}`);
});
