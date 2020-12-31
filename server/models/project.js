const mongoose = require("mongoose");
//  mongoose.models={}
const {Client}=require("./client")
const Project = mongoose.model(
  "projects",
    new mongoose.Schema({
    projectName: {
      type: String,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Client,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
       },
    subprojects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subprojects",
      },
    ],
  })
);
module.exports = {
  Project,
};
// const mongoose = require("mongoose");
// const Client=require("./client")
// var Project = new mongoose.Schema({
//   projectName: {
//       type: String,
//     },
//     clientId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "clients",
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "users", 
//        },
//     subprojects: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "subprojects",
//       },
//         ],
// });
// module.exports=mongoose.model("projects", Project);