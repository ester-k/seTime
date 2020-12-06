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
  from: "settime.noreplay@gmail.com",
  to: "sari0504145277@gmail.com",
  subject: "Sending Email using Node.js",
  text: "תהיי גאה באחותך שלמדה היום לבד לשלוח מייל מ Node js",
};

module.exports = {
  mailOptions,
  transporter,
  sendMail,
};
