const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { concat } = require("lodash");
const JWT_Token = "qwerty";
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
  },
  avatar: {
    type: Buffer,
  },
});

UserSchema.statics.findByCred = function (email, pass) {
  var User = this;
  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, rej) => {
      bcrypt.compare(pass, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          rej();
        }
      });
    });
  });
};

UserSchema.methods.generateToken = function () {
  var user = this;
  var access = "auth";
  var token = jwt.sign({ _id: this._id, access }, JWT_Token).toString();
  // user.token = concat([{ access, token }]);
  user.token = token;
  console.log(token);
  // console.log(user);
  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function (token) {
  var decoded;
  try {
    decoded = jwt.verify(token, JWT_Token);
  } catch (e) {
    console.log("e");
    return Promise.reject();
  }

  console.log(token);
  return this.findOne({ _id: decoded._id, token: token });
};
UserSchema.pre("save", async function (next) {
  var user = this;
  // console.log(user);
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(this.password, 10);
    console.log("asd");
  }
  next();
});

var User = mongoose.model("User", UserSchema);
module.exports = { User };
