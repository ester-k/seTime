const mongoose = require("mongoose");
const Role = mongoose.model(
  "role",
  new mongoose.Schema({
    name: {
      type: String,
    },
    access:{
        type:String,
    }
    
  })
);
module.exports = {
    Role,
};
