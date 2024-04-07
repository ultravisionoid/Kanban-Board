const mongoose = require("mongoose");
const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: String,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  status: {
    type: String,
    default: "open",
    enum: ["open", "in progress", "completed"],
  },
});
var Card = mongoose.model("Card", CardSchema);
module.exports = { Card };
