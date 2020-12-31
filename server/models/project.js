const mongoose = require("mongoose");
const {Client} = require('./client');

const Project = mongoose.model(
  "projects",
  new mongoose.Schema({
    projectName: {
      type: String,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Client,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
       },
    subprojects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subprojects",
      },
    ],
  })
);
module.exports = {
  Project,
};
