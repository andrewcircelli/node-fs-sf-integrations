// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");

module.exports = function setIndexPage(app) {
  // index route loads index.html
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
