const Transporter = require("../Config/Mailer");
require("dotenv").config();
 
const SendMail = async({to , subject , text , Message}) => {

    const FullText = `${text}\n\n${Message || ""}`;

    await Transporter.sendMail({
        from: process.env.MAIL_USER,
        to,
        subject,
        text: FullText,
    })
    console.log(`MailServices.js  -  to: ${to} , from: ${process.env.MAIL_USER} , ${text} , Message: ${Message}` );
}

module.exports = SendMail;