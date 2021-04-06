const mongoose = require("mongoose");
const Priority = mongoose.model(
  "prioritys",
   
  new mongoose.Schema({
    description: {
      type: String,
    },
    
  })
);
module.exports = {
  Priority,
};
