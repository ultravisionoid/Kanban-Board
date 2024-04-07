const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
