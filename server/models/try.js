const mongoose = require("mongoose");
const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    username: String,
    text: String,
    createdAt: Date,
  })
);

const Tutorial = mongoose.model(
  "Tutorial",
  new mongoose.Schema({
    title: String,
    author: String,
    images: [],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  })
);

module.exports = {
  Tutorial,
  Comment,
};
