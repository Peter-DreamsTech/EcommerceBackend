const mongoose = require("mongoose");

const UserOrders = mongoose.Schema({
    UserName: { type: String },
    UserEmail: { type: String} ,
    Product: [
        {
            ProductID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            Quantity: {type: Number, default: 1}
        }
    ]
},{timestamps: true})

module.exports = mongoose.model("OrderDetail" , UserOrders);