const mongoose = require("mongoose");
require("dotenv").config();

const DB_Connection = async()=>{
   try{
     await mongoose.connect(process.env.Mongo_URL)
    console.log("Server is Connected Successfully");
   }
   catch(err){
    console.log(`The MongoDB Connection Error: ${err.Message}`);
   }
}

module.exports = DB_Connection;