// const mongoose = require("mongoose");
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
//  mongoose.models={}
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

const Gallery = mongoose.model(
  "gallerys",
 new mongoose.Schema({
  "id": String,
  "imageUrl": String,
  "imageTitle": String,
  "imageDesc": String,
  "uploaded": { type: Date, default: Date.now },
}));
module.exports = {
  Gallery,
  Client
};
