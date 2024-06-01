const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const app = express();
const _ = require("lodash");
const { Card } = require("./models/Card");
const { Comment } = require("./models/Comment");
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
  // console.log(creds);
  User.findByCred(creds.email, creds.password)
    .then((user) => {
      // console.log(user);
      return user.generateToken().then((token) => {
        return res.header("auth", token).send(user).status(200);
      });
    })
    .catch((e) => res.status(404).send("User not found"));
});

app.post("/card/create", auth, (req, res, next) => {
  var card = new Card({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate || "",
  });
  card.assignedTo = req.user;
  Card.create(card)
    .then((response) => {
      res.header("auth", req.user.token);
      res.status(200).send(card);
    })
    .catch((err) => {
      res.status(400).send(err);
      console.log(err);
    });
});
app.get("/cards", (req, res) => {
  Card.find()
    .then((result) => res.status(200).send(result))
    .catch((err) => {
      res.status(404).send(err);
      console.log(err);
    });
});

app.get("/card/user", auth, (req, res) => {
  token = req.user.token;
  User.findByToken(token)
    .then((user) => {
      Card.find({ assignedTo: user })
        .then((r) => {
          res.status(200).send(r);
        })
        .catch((err) => {
          res.status(404).send(err);
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});
app.put("/cards/:id", auth, async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  Card.findById(id)
    .then((id) => {
      if (!id) {
        res.status(404).send(new Error("User not found"));
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
  await Card.findByIdAndUpdate(id, update, { new: true })
    .then((r) => {
      res.status(200).send(r);
    })
    .catch((e) => {
      console.log(e);
      res.status(404).send(e);
    });
});
app.delete("/card/:id", auth, async (req, res) => {
  const { id } = req.params;
  Card.findById(id)
    .then((id) => {
      if (!id) {
        res.status(404).send(new Error("User not found"));
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
  await Card.findByIdAndDelete(id)
    .then((r) => {
      res.status(200).send(r);
    })
    .catch((e) => {
      console.log(e);
      res.status(404).send(e);
    });
});
app.post("/comment", auth, (req, res) => {
  var comment = new Comment({
    content: req.body.content,
    author: req.user,
    card: req.body.card,
  });

  Comment.create(comment)
    .then((r) => {
      res.header("auth", req.user.token);
      res.status(200).send(comment);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

app.get("/comment/:id", auth, (req, res) => {
  var { id } = req.params;
  Card.findById(id)
    .then((r) => {
      if (!r) {
        res.status(404).send(new Error("user not found"));
      }
      Comment.find({ card: id })
        .then((comm) => {
          res.status(200).send(comm);
        })
        .catch((e) => {
          res.status(404).send(e);
        });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.listen(3000, () => {
  console.log("Server is started on 3000");
});
