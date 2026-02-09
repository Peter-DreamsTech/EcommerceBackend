const Agenda = require("../Config/Agenda");
const SendMail = require("../Services/MailServices");

Agenda.define("send-email" , async(job)=> {
    const {to , subject , text , Message} = job.attrs.data;

    console.log("JOB PICKED BY AGENDA");
    console.log("To:", to);

    try{
        await SendMail ({to , subject , text , Message});
        console.log("Mail Has Sent");
    }
    catch(err){
        console.log(err.message);
    }
});