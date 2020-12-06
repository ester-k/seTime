const mongoose = require("mongoose");
const Task = mongoose.model(
  "tasks",
  new mongoose.Schema({
    taskTypeId: {
      type: String,
    },
    clientId: {
      type: String,
    },
    projectId: {
      type: String,
    },
    subprojectId: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    additionalContent: {
      type: String,
    },
    remark: {
      type: String,
    },
    links: {
      type: Map,
      of: String,
    },
    files: {
      type: Map,
      of: String,
    },
    faultId: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
    completedDate: {
      type: Date,
    },
    sendMail: {
      type: Boolean,
    },
    clientAccess: {
      type: Boolean,
    },
    statusId: {
      type: String,
    },
    userId: {
      type: String,
    },
    isComplete: {
      type: Boolean,
      default:false,
    },
    priorityId: {
      type: String,
    },
  })
);
module.exports = {
  Task,
};
