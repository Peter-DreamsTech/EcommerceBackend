const {body} = require("express-validator");

const UserProductValidation = [
    body("UserID")
        .isEmpty().withMessage("The UserID should not be empty")
        .isAlphanumeric().withMessage("The UserID must be AlphaNumeric.."),

    body("Product")
        .isEmpty().withMessage("Product must not be empty")
        .isAlphanumeric().withMessage("The Product Object ID must be AlphaNumeric")
]