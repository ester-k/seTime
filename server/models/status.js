const mongoose = require("mongoose");
const Status = mongoose.model(
  "status",
  new mongoose.Schema({
    name: {
      type: String,
    },
    
  })
);
module.exports = {
    Status,
};
