const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "settime.noreplay@gmail.com",
      pass: "set12345",
    },
  })
);

const sendMail = async (req, res) => {
    console.log("im in sendmail service");
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("send mail"+error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  transporter.close()
};

const mailOptions = {
  from: "estersoftwaredeveloper@gmail.com",
  to: "settime.noreplay@gmail.com",
  subject: "Sending Email using Node.js",
  html: <div>Hi this is working...</div>,
};

module.exports = {
  mailOptions,
  transporter,
  sendMail,
};
