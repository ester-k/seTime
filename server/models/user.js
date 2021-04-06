const mongoose = require("mongoose");
mongoose.models = {};
const User = mongoose.model(
  "users",
  new mongoose.Schema({
    username: {
      type: String,
    },
    profileName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: Object,
    },
    managerId: {
      
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    role: {
      
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
    },
   
  },{ versionKey: false })
);

module.exports = {
  User,
};
