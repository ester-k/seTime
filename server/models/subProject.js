const mongoose = require("mongoose");
const Subproject = mongoose.model(
  "subproject",
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
  Subproject,
};
