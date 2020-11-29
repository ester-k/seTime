const mongoose = require("mongoose");
const Subproject = mongoose.model(
  "subprojects",
  new mongoose.Schema({
    subprojectsName: {
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
