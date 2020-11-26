const mongoose = require("mongoose");
const FaultType = mongoose.model(
  "faultType",
  new mongoose.Schema({
    name: {
      type: String,
    },
    
  })
);
module.exports = {
    FaultType,
};
