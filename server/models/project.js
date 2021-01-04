const mongoose = require("mongoose");
//  mongoose.models={}
const {Client}=require("./client")
const {Subproject}=require("./subProject")

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
        ref: Subproject,
      },
    ],
  })
);
module.exports = {
  Project,
};
