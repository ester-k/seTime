const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Project = mongoose.model(
  "projects",
  new mongoose.Schema({
    projectName: {
      type: String,
    },

    clientId: {
      type: Schema.Types.ObjectId,
      ref: "clients",
    },
    userId: {
      type: String,
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
