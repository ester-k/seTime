const mongoose = require("mongoose");
const TaskType = mongoose.model(
  "taskTypes",
  new mongoose.Schema({
    subprojects: {
      type: String,
    },
    
  })
);
module.exports = {
    TaskType,
};
