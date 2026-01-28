const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    UserName: {type: String},
    UserID: {type: String},
    UserEmail: {type: String, required: true},
    Role: {type: String , enum: ["Customer" , "Admin"] , default: "Customer"},
    Password: {type: String}
    // Retype_Password: {type: String}
},{timestamps:true})

// Indexex
UserSchema.index({UserID:1});
UserSchema.index({UserEmail: 1});

module.exports = mongoose.model("UserDetail" , UserSchema);