const mongoose = require("mongoose");
const Client = mongoose.model(
  "client",
  new mongoose.Schema({
    name: {
      type: String,
    }
  })
);
module.exports = {
  Client,
};
