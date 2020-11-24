const mongoose = require("mongoose");
const Project = mongoose.model(
  "projects",
  new mongoose.Schema({
    name: {
      type: String,
    },
    clientId: {
      type: String,
    },
  })
);
module.exports = {
  Project,
};
