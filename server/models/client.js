
const mongoose = require("mongoose");
const Client = mongoose.model(
  "clients",
    new mongoose.Schema({
      clientName: {
             type: String,
           },
          //  projects:[
          //    {
          //      type: mongoose.Schema.Types.ObjectId,
          //      ref: Project,
          //    },
          //  ],
  })
);

module.exports = {
  Client
};
