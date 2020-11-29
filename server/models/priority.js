const mongoose = require("mongoose");
const Priority = mongoose.model(
  "prioritys",
   
  new mongoose.Schema({
    name: {
      type: String,
    },
    
  })
);
module.exports = {
  Priority,
};
