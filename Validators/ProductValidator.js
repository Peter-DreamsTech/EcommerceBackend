const {body} = require("express-validator");

const ProductValidationRules = [
    body("ProductName")
        .notEmpty().withMessage("The Product Name must not be empty"),

    body("ProductID")
        .notEmpty().withMessage("The ProductID in Prod_Vald ")
        .isAlphanumeric().withMessage("The ProductID must be AlphaNumeric value"),

    // body("ProductImage")
    //     .isString().withMessage("The Product Image path must be a string"),

    body("Price")
        .isInt({gt:0}).withMessage("The Price must be Nuber and it must be greater than 0"),

    body("Offer")
        .isFloat({min:0}).withMessage("The Offer must Number and greater than or equal to 0")
]

module.exports = ProductValidationRules;

const ProductPatchValidationRules = [
    body("ProductName").optional()
        .notEmpty().withMessage("The Product Name must not be empty"),

    body("ProductID").optional()
        .notEmpty().withMessage("The ProductID in Prod_Vald ")
        .isAlphanumeric().withMessage("The ProductID must be AlphaNumeric value"),

    // body("ProductImage")
    //     .isString().withMessage("The Product Image path must be a string"),

    body("Price").optional()
        .isInt({gt:0}).withMessage("The Price must be Nuber and it must be greater than 0"),

    body("Offer").optional()
        .isFloat({min:0}).withMessage("The Offer must Number and greater than or equal to 0")
]

module.exports = ProductPatchValidationRules;