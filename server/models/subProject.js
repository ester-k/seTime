const mongoose = require("mongoose");
const Subproject = mongoose.model(
  "subprojects",
  new mongoose.Schema({
    subprojectName: {
      type: String,
    },
    projectId: {
      type: String,
    },
  },{ versionKey: false })
);
module.exports = {
  Subproject,
};
