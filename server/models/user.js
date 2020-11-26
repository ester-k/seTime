const mongoose = require("mongoose");
const User = mongoose.model(
  "users",
  new mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    managerId: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    roleId: {
      type: String,
    },
  })
);
module.exports = {
  User,
};
