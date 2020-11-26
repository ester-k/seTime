const mongoose = require("mongoose");
const TaskType = mongoose.model(
  "taskType",
  new mongoose.Schema({
    name: {
      type: String,
    },
    
  })
);
module.exports = {
    TaskType,
};
