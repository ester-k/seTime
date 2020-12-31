// const mongoose = require("mongoose");
// // mongoose.models={}
// const clientSchema =
//   new mongoose.Schema({
//     clientName: {
//       type: String,
//     },
//     projects:[
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "projects",
//       },
//     ]

//   }, )
// clientSchema.set("toObject", { virtuals: true });
// clientSchema.set("toJSON", { virtuals: true });
// const Client=mongoose.model("clients", clientSchema);
// module.exports = {Client};
const mongoose = require("mongoose");
mongoose.models={}
const Client = mongoose.model(
  "clients",
  new mongoose.Schema({
    clientName: {
      type: String,
    },
    projects:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects",
      },
    ]
    
  })
);
module.exports = {
  Client,
};

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// let Client = new Schema({
//   clientName: {
//           type: String,
//        },
//        projects:[
//          {
//            type: mongoose.Schema.Types.ObjectId,
//            ref: "projects",
//          },
//        ]
// });

// const model = mongoose.model("clients", Client);

// module.exports = model;
