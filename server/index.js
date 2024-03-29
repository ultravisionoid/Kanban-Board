const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const app = express();
const _ = require("lodash");
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/kanban");

app.post("/users", async (req, res) => {
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  });

  user
    .save()
    .then(() => {
      return user.generateToken();
      // console.log("AWEDSA");
    })
    .then((token) => {
      // console.log(token);
      return res.header("auth", token).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
  // console.log(user);
});
app.post("/auth", auth, (req, res, next) => {
  res.status(200).send(req.user);
});

app.post("/user/login", (req, res) => {
  var creds = _.pick(req.body, ["email", "password"]);
  User.findByCred(creds.email, creds.password)
    .then((user) => {
      console.log(user);
      return user.generateToken().then((token) => {
        return res.header("auth", token).send(user).status(200);
      });
    })
    .catch((e) => res.status(400).send(e));
});

app.listen(3000, () => {
  console.log("Server is started");
});
