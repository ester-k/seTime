const mongoose = require("mongoose");
const FaultType = mongoose.model(
  "faults",
  new mongoose.Schema({
    description: {
      type: String,
    },
  })
);
module.exports = {
  FaultType,
};
