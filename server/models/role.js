const mongoose = require("mongoose");
const Role = mongoose.model(
  "roles",
  new mongoose.Schema({
    description: {
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
