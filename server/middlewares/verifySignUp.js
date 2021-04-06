const db = require("../models");
const ROLES = db.ROLES;
const {User} = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
    
      res.status(400).send({ message: "שם משתמש זה כבר קיים" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: " כתובת מייל זו כבר בשימוש" });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  // if (req.body.role) {
  //   for (let i = 0; i < req.body.role.length; i++) {
  //     if (!ROLES.includes(req.body.role[i])) {
  //       res.status(400).send({
  //         message: `Failed! Role ${req.body.role[i]} does not exist!`,
  //       });
  //       return;
  //     }
  //   }
  // }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
