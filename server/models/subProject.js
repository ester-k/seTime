const mongoose = require("mongoose");
const SubProject = mongoose.model(
  "subProject",
  new mongoose.Schema({
    name: {
      type: String,
    },
    projectId: {
      type: String,
    },
  })
);
module.exports = {
  SubProject,
};
