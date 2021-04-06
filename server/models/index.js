const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./role");

db.ROLES = ["מנהל מערכת", "מנהל", "מנהל פרויקטים", "מעצב", "מפתח", "לקוח"];

module.exports = db;
