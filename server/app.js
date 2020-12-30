const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");
const managerRoutes = require("./routes/managerRoutes");
require("./models/user");
require("./models/role");
//const { connect } = require('./connect');
// connect();
const app = express();
const PORT = process.env.PORT || 4000;
const db = require("./models");
const Role = db.role;
const dbConfig = require("./config/db.config");

var corsOptions = {
  origin: "http://localhost:4000",
};
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers":
    "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
  });

  next();
});

app.use("/manager", managerRoutes);
app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use("/project", projectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    //initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// function initial() {
//   console.log("add some");
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user",
//       }).save((err) => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator",
//       }).save((err) => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin",
//       }).save((err) => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
