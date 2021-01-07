const config = require("../config/auth.config");
let mongoose = require("mongoose");
const sendemailService = require("../services/sendemailService");
const db = require("../models");
const { User } = db.user;
const { Role } = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const pass = req.body.password;
  const user = new User({
    username: req.body.username,
    role: req.body.role,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  console.log("enter to save");
  user.save((err, user) => {
    if (err) {
      console.log("i fail in save 1");
      res.status(500).send({ message: err });
      return;
    }
    console.log("user role:");
    console.log(req.body.role);
    if (req.body.role) {
      Role.find({ description: { $in: req.body.role } }, (err, role) => {
        if (err) {
          console.log("i fail in role find 2");
          console.log(err);
          res.status(500).send({ message: err });
          return;
        }
        //user.role = role.map((role) => role._id);
        user.save((err) => {
          if (err) {
            console.log("error in role %s", err);
            res.status(500).send({ message: err });
            return;
          }
          console.log("enter to email");
          console.log(pass);
          sendemailService.userRegisterMail({ user: user, pass: pass });
          res.send({ message: "משתמש נרשם בהצלחה!!" });
        });
      });
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.role = [role._id];
        user.save((err) => {
          if (err) {
            console.log("i fail here 3 in save");
            res.status(500).send({ message: err });
            return;
          }
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("role", "-__v")
    .exec((err, user) => {
      if (err) {
        console.log("signin console.error:%s", err);
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "משתמש לא קיים." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "הסיסמה שגויה.",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });

      var authorities = [];
      authorities.push(user.role.description);
      console.log("user Role :", user.role.description);
      console.log("authorities :", authorities);
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        role: authorities,
        accessToken: token,
      });
    });
};
