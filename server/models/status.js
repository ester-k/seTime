const mongoose = require("mongoose");
const Status = mongoose.model(
  "status",
  new mongoose.Schema({
    statusName: {
      type: String,
    },
    
  })
);
module.exports = {
    Status,
};
