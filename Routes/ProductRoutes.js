const express = require("express");
const router = express.Router();

const ProdImageUpload = require("../Middleware/ProductImageUpload");
const {ProductsController , ProductUpdation , ProductDeletion} = require("../Controller/ProductController");
const ProductValidationRules = require("../Validators/ProductValidator");
const ProductPatchValidationRules = require("../Validators/ProductValidator");
const Validate = require("../Middleware/Validate");
const VerifyToken = require("../Middleware/VerifyToken");
const IsAdmin = require("../Middleware/IsAdmin");


router.post("/CreateProduct" , VerifyToken , IsAdmin , ProdImageUpload.array("ProductImage" , 5) , ProductValidationRules , Validate, ProductsController);
router.patch("/ProductUpdate/:id" , VerifyToken, IsAdmin, ProdImageUpload.array("ProductImage" , 5) , ProductPatchValidationRules , Validate , ProductUpdation);
router.delete("/ProductDeletion/:id" , VerifyToken, IsAdmin ,  ProductDeletion);
// router.get("/AdminOrderCheck" , VerifyToken, IsAdmin); /ProdImageUpload.array("ProductImage" , 5)  ,

module.exports = router;