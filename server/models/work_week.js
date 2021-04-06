const mongoose = require("mongoose");
const { Project } = require("./project");
const { User } = require("./user");
const Work_week = mongoose.model(
  "work_weeks",
  new mongoose.Schema({
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Project,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    date: {type: Date},
  })

)
;
module.exports = {
  Work_week,
};
