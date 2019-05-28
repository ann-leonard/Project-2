var db = require("../models");
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {
  app.get("/api/users", function (req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findAll({
      include: [db.Bet]
    }).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.get("/api/users/:id", function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Bet]
    }).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.post("/api/users", function (req, res) {
    db.User.create(req.body).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.put("/api/users/:id", function (req, res) {
    console.log(req.body.data);
    console.log(req.params);
    db.User.update(
      { balance: req.body.data},
      { where: {id: req.params.id} }
    ).then(() => { });
  });

  app.delete("/api/users/:id", function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });
  //AUTH
  //this is how passport checks our database for a user 
  passport.use(new LocalStrategy(
  function(name, password, done) {
    db.User.findOne({ name: name }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

  // If the user has valid login credentials, send them to the account page.
  //the authenticate function uses the local strategy to check our db for credentials
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.redirect("/account");
  });

  //
};
