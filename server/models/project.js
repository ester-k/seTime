const mongoose = require("mongoose");
const Project = mongoose.model(
  "projects",
  new mongoose.Schema({
    projectName: {
      type: String,
    },
    clientId: {
      type: String,
    },
    userId: {
      type: String,
    },
  })
);
module.exports = {
  Project,
};
