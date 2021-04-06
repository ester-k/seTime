const mongoose = require("mongoose");
const {Task}=require('./task')
const Subproject = mongoose.model(
  "subprojects",
  new mongoose.Schema({
    subprojectName: {
      type: String,
    },
    projectId: {
      type: String,
    },
    clientId: {
      type: String,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Task,
      },
    ],
  },{ versionKey: false })
);
module.exports = {
  Subproject,
};
