const Agenda = require("agenda");
require("dotenv").config();

const agenda = new Agenda({
    db: {
        address: process.env.AGENDA_MONGO_URL,
        collection: "EcommerceAgendaJobs"
    }
});

module.exports = agenda;