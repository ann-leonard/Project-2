// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuth");
// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // cms route loads cms.html
  app.get("/new", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/new-bets.html"));
  });

  // blog route loads blog.html
  app.get("/bets", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/all-bets.html"));
  });

  // authors route loads author-manager.html
  app.get("/users", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/all-users.html"));
  });

  // authors route loads account.html
  app.get("/account", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/account.html"));
  });

};
