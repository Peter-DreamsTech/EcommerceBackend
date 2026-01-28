const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    UserName: {type: String},
    UserID: {type: String},
    UserEmail: {type: String, required: true},
    Role: {type: String , enum: ["Customer" , "Admin"] , default: "Customer"},
    Password: {type: String}
    // Retype_Password: {type: String}
},{timestamps:true})

module.exports = mongoose.model("UserDetail" , UserSchema);