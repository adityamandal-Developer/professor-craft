const nodemailer = require("nodemailer");
const { NM_USER, NM_PASS} = process.env;


const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
      user: NM_USER,
      pass: NM_PASS,
  },
});

async function sendMail(receiver, subject, msg) {
  try {
    const mailOptions = {
      from: NM_USER,
      to: receiver,
      subject: subject,
      text: msg,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email: " + error);
  }
}

module.exports = { sendMail };