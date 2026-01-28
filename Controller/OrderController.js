const OrderModelSchema = require("../Models/OrderModel");
const UserModelSchema = require("../Models/UserModel");
const ProductModelSchema = require("../Models/ProductModel");
const { deleteModel } = require("mongoose");

exports.OrderController = async(req , res) => {
    
    try{
        const UserID = req.User.UserID;

        const User = await UserModelSchema.findOne({UserID: UserID});

        if( !User){
            return res.status(404).send("User Not Found");
        }

        const {Product} = req.body;
         if(!Product || Product.length === 0){
            res.status(400).send("User didn't select any Product");
         }

         const ProductIDs = Product.map(P => P.ProductID);
         const ExistingProducts = await ProductModelSchema.find({
            _id: {$in: ProductIDs}
         })
         if(!ExistingProducts){
            res.status(400).send("The Product Existing Error..,");
         }

         
         const Order = await OrderModelSchema.create({
            UserName: User.UserName,
            UserEmail: User.UserEmail,
            Product: Product
         });

         res.status(200).json({
            Message: "The Product Saved Successfully",
            Orders: Order
         });
    }

    catch(err){
        res.status(401).json({
            Message: "Error in Order Controller",
            Error: err.message
        })
    }
}


exports.AllOrdersView = async(req,res) => {
    try{
        const ViewOrders = await OrderModelSchema.aggregate([
            { $unwind: "$Product" }, 
            {
                $lookup: {
                    from: "products",
                    localField: "Product.ProductID",
                    foreignField: "_id",
                    as: "AllOrders"
                }
            },
             { $unwind: "$AllOrders" },
             {
                $project: {
                    _id:1,
                    UserName: 1,
                    UserEmail: 1,
                    
                    ProductName: "$AllOrders.ProductName",
                    Price: "$AllOrders.Price",

                    Quantity: "$Product.Quantity",
                    Offer: "$AllOrders.Offer"
                }
             }
        ])
        res.status(200).json({
            Message: "All Orders Viewed",
            Orders: ViewOrders
        })
    }
    catch(err){
        res.status(400).json({
            Message: "Error in AllOrderView",
            Error: err.message
        })
    }
}

exports.OrderCancelController= async(req,res) => {
    try{
        const UserID = req.User.UserID;
        console.log(UserID);

        const UserExist = await UserModelSchema.findOne({UserID: UserID});
        const UserMail = UserExist.UserEmail;

        const OrderedProduct = req.params.id
        const ExistOfOrderedProduct = await OrderModelSchema.findById(OrderedProduct);

        if(UserMail === ExistOfOrderedProduct.UserEmail){
            await OrderModelSchema.findByIdAndDelete(OrderedProduct);

            res.status(200).json({
                Message: "Order Deleted",
                CanceledOrder: ExistOfOrderedProduct
            });
        }
        else{
            res.status(400).send("The User Still not ordered..");
        }

        // res.status(200).json({
        //     Message: ExistOfOrderedProduct
        // })
    }
    catch(err){
        res.status(400).json({
            Message: "Order Delete Controller Error",
            Error: err.message
        });
    }
}