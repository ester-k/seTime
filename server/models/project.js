const mongoose = require("mongoose");
const {Client}=require("./client")
const {Subproject}=require("./subProject")

const Project = mongoose.model(
  "projects",
    new mongoose.Schema({
    projectName: {type: String},
    clientId: {type: mongoose.Schema.Types.ObjectId,ref: Client},
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
