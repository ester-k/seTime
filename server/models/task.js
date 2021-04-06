const mongoose = require("mongoose");
const {User}=require('./user')
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
      type:mongoose.Schema.Types.ObjectId,
      ref:User,
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
    status: {
      type: String,
    },
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:User,
    },
    isComplete: {
      type: Boolean,
      default:false,
    },
    priority: {
      type: String,
    },
  })
);
module.exports = {
  Task,
};
