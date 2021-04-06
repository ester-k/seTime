const mongoose = require("mongoose");
const connect = () => {
  mongoose.connect("mongodb://localhost:27017/SetTimeDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoIndex: true,
  });
};
require("./models/Client");
require("./models/Project");

module.exports = {
  connect,
};
