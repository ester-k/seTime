const mongoose = require("mongoose");
const FaultType = mongoose.model(
  "fault",
  new mongoose.Schema({
    description: {
      type: String,
    },
  })
);
module.exports = {
  FaultType,
};
