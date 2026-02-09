const nodemailer = require("nodemailer");
require("dotenv").config();

const Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
})

module.exports = Transporter;