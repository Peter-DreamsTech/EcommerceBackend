const { findByIdAndDelete } = require("../Models/ProductModel");
const UserModelSchema = require("../Models/UserModel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.RegUser = async(req,res) => {
   try{

    const {Password, Retype_Password, ...rest} = req.body

    if(Password !== Retype_Password){
      return res.status(400).send("Passwords do not match..")
    }

    const HasedPassword = await bcrypt.hash(Password , parseInt(process.env.SALT_ROUNDS))

     const User = await UserModelSchema.create({
        ...rest,
        Password: HasedPassword
     })

    res.status(201).json({
      Message: "User Details Saved Successfully",
      UserDetails: User
    })
   }
   catch(err){
    res.status(401).json({
      Error: "Error in UserController",
      Message: err.message
    });
   }
}

exports.LoginUser = async(req,res) => {
   try{

      const {UserEmail , Password} = req.body;

      const User = await UserModelSchema.findOne({UserEmail})
      if(!User){
         return res.status(404).send("User not found..");
      }

      const isMatch = await bcrypt.compare(Password , User.Password);
      if(!isMatch){
         res.status(400).send("Entered Password is Wrong..");
      }

      const token = jwt.sign(
         {UserID: User.UserID , Role: User.Role},
         process.env.JWT_SECRETS,
         {expiresIn: "2h"}
      )

      res.status(201).json({
         Message: "User Logined Successfully",
         User: User.UserName,
         Token: token
      })
   }
   catch(err){
      res.status(400).json({
         Message: "Error in LoginUser Controller",
         Error: err.message
      })
   }
}

exports.UpdateUser = async(req , res) => {
   try{
      const UserID = req.params.id;

      const UpdatedUser = await UserModelSchema.findByIdAndUpdate(
         UserID,
         req.body,
         {new:true}
      );

      res.status(200).json({
         Message: "User Data Updated successfully",
         UpdatedData: UpdatedUser
      })
   }
   catch(err){
      res.status(401).json({
         Error: "Error in UserController",
         Message: err.message
      });
   }
}

exports.DeleteUser = async(req , res) => {
   try{
      const DeleteUserID = req.params.id;

      const DeletedUser = await UserModelSchema.findByIdAndDelete(DeleteUserID);

      res.status(200).json({
         Message: "The User is Deleted",
         User: DeletedUser
      });

   }catch(err){
      res.status(400).json({
         message: "Error in DeleteUser Controlling",
         Error:err.message
      })
   }
}
