const mongoose = require("mongoose");
const FaultType = mongoose.model(
  "fault_type",
  new mongoose.Schema({
    name: {
      type: String,
    },
  })
);
module.exports = {
  FaultType,
};
