const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { User } = require("../models/user");
const { Role } = require("../models/role");
const Mailgen = require("mailgen");

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "settime.noreplay@gmail.com",
      pass: "setime179‏",
    },
  })
);

const sendMail = async (req, res) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("send mail" + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  transporter.close();
};

const mailOptions = {
  from: "settime.noreplay@gmail.com",
  to: "settime.noreplay@gmail.com",
  subject: "נרשמת בהצלחה למערכת SetTime!!",
  html: "<div></div>",
};

let MailGenerator = new Mailgen({
  theme: "salted",
  textDirection: "rtl",
  product: {
    name: "SetTime",
    link: "http://localhost:4000/",
    logo: "../client/src/assets/img/logo.jpg",
  },
});
const userRegisterMail = async (req, res) => {
  let username = req.user.username;
  let password = req.pass;
  let email = req.user.email;
  let role = req.user.role;
  let r;
  await Role.findById(role, function (err, result) {
    if (err) {
      console.log("error in fins %s", err);
    } else {
      r = result;
      console.log("Result : ", result);
      role = r.description;
    }
  });
  console.log(username, role);
  let response = {
    body: {
      name: username,
      greeting: "שלום",
      intro: ["סיסמתך היא: " + password, "תפקידך במערכת הוא: " + role],
      action: {
        instructions: "כדי להכנס למערכת לחץ על כפתור",
        button: {
          text: "להכנס למערכת",
          color: "#48cfad", // Optional action button color
          link: "http://localhost:4200/signIn",
        },
      },
    },
  };
  let mail = MailGenerator.generate(response);
  let message = {
    from: "settime.noreplay@gmail.com",
    to: email,
    subject: "נרשמת בהצלחה למערכת SetTime!!",
    html: mail,
  };
  transporter.sendMail(message, function (error, info) {
    if (error) {
      console.log("send mail" + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  transporter.close();
};
module.exports = {
  mailOptions,
  transporter,
  sendMail,
  userRegisterMail,
};
