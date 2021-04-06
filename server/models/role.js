const mongoose = require("mongoose");
mongoose.models = {};
const Role = mongoose.model(
  "roles",
  new mongoose.Schema({
    description: {
      type: String,
    },
  })
);
module.exports = {
  Role,
};
