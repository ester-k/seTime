const mongoose = require("mongoose");
const Task = mongoose.model(
  "tasks",
  new mongoose.Schema({
    taskTypeId: {
      type: String,
    },
    cleintId: {
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
      of: Stlring,
    },
    files: {
      type: Map,
      of: Stlring,
    },
    faultId: {
      type:String,
    },
    createdBy: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    completedDate: {
      type: Date,
    },
    sendMail: {
      type:Boolean,
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
    },
    priorityId: {
      type: String,
    },
  })
);
module.exports = {
  Task,
};
