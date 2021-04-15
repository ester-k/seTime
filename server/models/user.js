const mongoose = require("mongoose");
mongoose.models = {};
const {Role}=require('./role')

const User = mongoose.model(
  "users",
  new mongoose.Schema(
    {
      username: {type: String },
      profileName: {type: String},
      email: {type: String},
      password: {type: String},
      image: {type: Object},
      managerId: {type: String},
      isActive: {type: Boolean,default: false},
      role: {type: mongoose.Schema.Types.ObjectId,ref: Role},
      gender: {type: String,default: "male"},
    },
    { versionKey: false }
  )
);
module.exports = {
  User,
};
