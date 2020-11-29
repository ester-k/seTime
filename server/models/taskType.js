const mongoose = require("mongoose");
const TaskType = mongoose.model(
  "taskTypes",
  new mongoose.Schema({
    description: {
      type: String,
    },
    
  })
);
module.exports = {
    TaskType,
};
