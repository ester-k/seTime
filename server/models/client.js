const mongoose = require("mongoose");
const Client = mongoose.model(
  "client",
  new mongoose.Schema({
    clientName: {
      type: String,
    }
  })
);
module.exports = {
  Client,
};
