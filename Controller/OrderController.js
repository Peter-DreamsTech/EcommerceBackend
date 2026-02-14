const OrderModelSchema = require("../Models/OrderModel");
const UserModelSchema = require("../Models/UserModel");
const ProductModelSchema = require("../Models/ProductModel");
const Agenda = require("../Config/Agenda"); 
const RedisClient = require("../Config/Redis");
// const { deleteModel } = require("mongoose");
   
exports.OrderController = async(req , res) => {    
             
    try{            
        const UserID = req.User.UserID;
        const {email , subject ,text} = req.body;
                          
        const User = await UserModelSchema.findOne({UserID: UserID});
  
        if( !User){
            return res.status(404).send("User Not Found");
        }

        const {Product} = req.body;
        console.log(Product);
         if(!Product || Product.length === 0){
            return res.status(400).send("User didn't select any Product");
         }

         const ProductIDs = Product.map(P => P.ProductID);
         const ExistingProducts = await ProductModelSchema.find({
            _id: {$in: ProductIDs}
         })
        //  if(!ExistingProducts){
        //     return res.status(400).send("The Product Existing Error..,");
        //  }
         if (ExistingProducts.length !== ProductIDs.length) {
            return res.status(404).send("One or more products not found");
         }

         
         const Order = await OrderModelSchema.create({
            UserName: User.UserName,
            UserEmail: User.UserEmail,
            Product: Product
         });

         await Agenda.schedule("in 180 minutes" , "send-email", {
            to: User.UserEmail,
            subject: "Order Confirmation",
            text: JSON.stringify(Order, null, 2),
            Message: "Your Product is out for Delivery"
         });
         console.log("The Mail has scheduled for Order Confirmation");

         res.status(201).json({
            Message: "The Product Saved Successfully",
            Orders: Order
         });

    }

    catch(err){
        res.status(500).json({
            Message: "Error in Order Controller",
            Error: err.message
        })
    }
}


exports.AllOrdersView = async(req,res) => {
    try{

        const CacheKey = "Redis_AllOrderView";
        const RedisCacheData = await RedisClient.get(CacheKey);

        if(RedisCacheData){
            console.log("From Redis - All Orders View");
            return res.status(200).json({
                Message: "All Orders View From Redis",
                RedisData: JSON.parse(RedisCacheData)
            });
        }


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
        ]);

        const AllOrdersData = {
            Orders: ViewOrders
        }
        
        await RedisClient.setEx(
            CacheKey,
            120,
            JSON.stringify(AllOrdersData)
        )
           
        console.log("All Orders View From MongoDB");

        res.status(200).json({
            Message: "All Orders Viewed",
            Orders: AllOrdersData
        })
    }
    catch(err){
        res.status(500).json({
            Message: "Error in AllOrderView",
            Error: err.message
        })
    }
}

exports.OrderCancelController= async(req,res) => {
    try{
        console.log(req.User);
        const UserID = req.User.UserID;
        console.log(UserID);

        const UserExist = await UserModelSchema.findOne({UserID: UserID});
        const UserMail = UserExist.UserEmail;

        const OrderedProduct = req.params.id
        const ExistOfOrderedProduct = await OrderModelSchema.findById(OrderedProduct);

        if(UserMail === ExistOfOrderedProduct.UserEmail){
            await OrderModelSchema.findByIdAndDelete(OrderedProduct);

            await Agenda.schedule("in 60 minutes" , "send-email", {
            to: UserMail,
            subject: "Cancel Order Confirmation",
            text: JSON.stringify(ExistOfOrderedProduct, null, 2)

         });
         console.log("The Mail has scheduled for Order Cancelation");


            res.status(200).json({
                Message: "Order Canceled",
                CanceledOrder: ExistOfOrderedProduct
            });
        }
        else{
            res.status(403).send("The User not allowed to cancel the order..");
        }

        // res.status(200).json({
        //     Message: ExistOfOrderedProduct
        // })
    }
    catch(err){
        res.status(500).json({
            Message: "Order Delete Controller Error",
            Error: err.message
        });
    }
}