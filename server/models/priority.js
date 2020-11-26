const mongoose = require("mongoose");
const Priority = mongoose.model(
  "priority",
  new mongoose.Schema({
    name: {
      type: String,
    },
    
  })
);
module.exports = {
  Priority,
};
