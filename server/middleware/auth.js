const { User } = require("../models/User");

var auth = (req, res, next) => {
  var token = req.header("auth");

  User.findByToken(token)
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("No user found"));
      }
      req.user = user;
      next();
    })
    .catch((e) => {
      res.status(401).send("Token invalid relogin");
    });
};

module.exports = { auth };
