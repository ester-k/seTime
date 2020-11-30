const mongoose = require("mongoose");
const TaskType = mongoose.model(
  "task_types",
  new mongoose.Schema({
    description: {
      type: String,
    },
    
  })
);
module.exports = {
    TaskType,
};
