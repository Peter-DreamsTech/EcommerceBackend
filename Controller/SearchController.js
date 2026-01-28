const ProductModelSchema = require("../Models/ProductModel");
const mongoose = require("mongoose");

exports.SeachProductsController = async(req,res) => {
        try{
            // console.log(req.query);
        const Keyword = req.query.keyword;
        if(!Keyword){
            return res.status(404).send("Keyword must needed..");
        }

        let Filter = {};

        if(mongoose.Types.ObjectId.isValid(Keyword)){
            Filter = {
                $or: [
                    {_id: Keyword},
                    {ProductName: {$regex: Keyword , $options: "i"}},
                    {ProductID: {$regex: Keyword , $options: "i"}}
                ]
            }
        }
        else{
            Filter = {
                $or: [
                    {ProductName: {$regex: Keyword , $options: "i"}},
                    {ProductID: {$regex: Keyword , $options: "i"}}
                ]
            }
        }

        const Products = await ProductModelSchema.find(Filter);

        if(Products.length === 0){
            return res.status(404).send("The Product Not Found..");
        }

        res.status(200).json({
            Message: "the Searched Products",
            SerachedProducts: Products
        })
    }
    catch(err){
        res.status(400).json({
            Message: "Error in Search Controller",
            Error: err.message
        })
    }
}