const mongoose = require("mongoose");
mongoose.models = {};
const {Role}=require('./role')

const SignRequest = mongoose.model(
  "signRequests",
  new mongoose.Schema({
    name: {
      type: String,
    },
    role: {
        type:String
        // type: mongoose.Schema.Types.ObjectId,ref: Role
      },
      email: {
        type: String,
      },
      massage: {
        type: String,
      },
  })
);
module.exports = {
    SignRequest,
};
