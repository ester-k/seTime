const mongoose = require("mongoose");
const Task = mongoose.model(
  "tasks",
  new mongoose.Schema({
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    priority: {
      type: Number,
    },
    status: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    duration: {
      type: Number,
    },
    projectKey: {
      type: String,
    },
    userId: {
      type: String,
    },
    isComplete: {
      type: Boolean,
    },
  })
);
module.exports = {
  Task,
};
