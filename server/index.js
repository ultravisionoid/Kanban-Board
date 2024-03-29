const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const app = express();
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

app.listen(3000, () => {
  console.log("Server is started");
});
