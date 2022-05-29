// Dependencies
// =============================================================
const express = require("express");
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
