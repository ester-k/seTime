const mongoose = require("mongoose");
const {Client}=require("./client")
const {User}=require("./user")
const {Subproject}=require("./subProject")

const Project = mongoose.model(
  "projects",
    new mongoose.Schema({
    projectName: {type: String},
    clientId: {type: mongoose.Schema.Types.ObjectId,ref: Client},
    projectManager: {type: mongoose.Schema.Types.ObjectId,ref:User},
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
