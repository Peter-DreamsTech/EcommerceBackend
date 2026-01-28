const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    ProductName: {type: String},
    ProductID: {type: String},
    ProductImage: {type:[String] , default:[]},
    Price: {type: Number , min:0},
    Offer: {type: Number , default: 0}
},  {timestamps: true} );

// index
ProductSchema.index({ProductName:1});
ProductSchema.index({ProductID: 1});

module.exports = mongoose.model("Product" , ProductSchema);