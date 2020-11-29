const mongoose = require("mongoose");
const Client = mongoose.model(
  "clients",
  new mongoose.Schema({
    clientName: {
      type: String,
    }
  })
);
module.exports = {
  Client,
};
