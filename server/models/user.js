const mongoose = require("mongoose");
mongoose.models = {};
const User = mongoose.model(
  "users",
  new mongoose.Schema({
    username: {
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
    },
    role: {
      
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
    },
  })
);
//mongoose.model('User', User)
module.exports = {
  User,
};
