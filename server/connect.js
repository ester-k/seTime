const mongoose = require("mongoose");
const connect = () => {
  mongoose.connect("mongodb://localhost:27017/SetTimeDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
require('./models/clients');
module.exports = {
  connect,
};
