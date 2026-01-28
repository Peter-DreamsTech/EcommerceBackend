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

// Indexex

UserOrders.index({UserEmail: 1});
UserOrders.index({"Product.ProductID": 1});

module.exports = mongoose.model("OrderDetail" , UserOrders);