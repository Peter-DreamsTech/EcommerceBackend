const ProductModelSchema = require("../Models/ProductModel");

exports.ProductsController = async(req , res) => {
    try{
        const {ProductName , ProductID , Price , Offer} = req.body;

        const ImageFiles = req.files.map(file => file.filename)

        const ProductUpload = await ProductModelSchema.create({
            ProductName,
            ProductID,
            ProductImage: ImageFiles,
            Price,
            Offer
        })
        res.status(201).json({
            Message: "Product Created Successfully",
            Product: ProductUpload
        });
    }
    catch(err){
        res.status(500).json({
            message: "Product Controller Error",
            Error: err.message
        })
    }
}

exports.ProductUpdation = async(req,res) =>{
    try{
        const ProductID = req.params.id;

        const {ProductName, Price , Offer} = req.body;

        const UpdatedData = {
            ProductName,
            Price,
            Offer
        }

        if(req.files && req.files.length > 0){
            const ImageFiles = req.files.map(file => file.filename);
            UpdatedData.ProductImage = ImageFiles;
        }

        const UpdatedProduct = await ProductModelSchema.findByIdAndUpdate(
            req.params.id,
            UpdatedData,
            {new: true}
        )

        if (!UpdatedProduct) {
                return res.status(404).send("Product not found");
            }


        res.status(200).json({
            Message: "Product Data Updated Successfully",
            Product: UpdatedProduct
        })
    }
    catch(err){
        res.status(500).json({
            Message: "Product Updation Error",
            Error: err.message
        })
    }
}

exports.ProductDeletion = async(req,res) => {
    try{
        const ProductID = req.params.id;

        const Deletion = await ProductModelSchema.findByIdAndDelete(ProductID);

        if(!Deletion){
            return res.status(404).json({
                Message: "No such Product to delete",
                Error: err.message
            })
        }

        res.status(200).json({
            Message: "Product Deleted Successfully",
            Product: Deletion
        })
    }
    catch(err){
        res.status(500).json({
            Message: "Error in Product Deletion",
            Error: err.message
        })
    }
} 
