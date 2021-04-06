const mongoose = require("mongoose");
const Status = mongoose.model(
  "status",
  new mongoose.Schema({
    description: {
      type: String,
    },
    
  })
);
module.exports = {
    Status,
};
