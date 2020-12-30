const mongoose = require("mongoose");
const Work_week = mongoose.model(
  "work_weeks",
  new mongoose.Schema({
    project:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects",
      },
       user: {
     type: String,
   },
    date: {
      type: Date,
    },
  })
);
module.exports = {
  Work_week,
};
