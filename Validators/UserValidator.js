const {body} = require("express-validator");

const UserValidationRules = [
    body("UserName")
        .notEmpty().withMessage("User Name is Required")
        .isLength({min:4}).withMessage("UserName Must be 4 Characters Long"),

    body("UserID")
        .notEmpty().withMessage("UserID must not be empty")
        .isAlphanumeric().withMessage("The User ID must be Alphanumeric"),

    body("UserEmail").isEmail().withMessage("Enter a Valid Email"),

    body("Role").isIn(["Customer" , "Admin"]).withMessage("The Role Must be either Customer or Admin"),

    body("Password")
        .notEmpty().withMessage("The Password should not be empty")
        .isAlphanumeric().withMessage("The Password must be Alphanumeric Value"),

    body("Retype_Password").custom((value , {req}) => {
        if(value !== req.body.Password){
            throw new Error("Passwords do not match..")
        }
        return true;
    })
]

module.exports = UserValidationRules;


const UserValidationPatchRules = [
    body("UserName").optional()
        .notEmpty().withMessage("User Name is Required")
        .isLength({min:4}).withMessage("UserName Must be 4 Characters Long"),

    body("UserID").optional()
        .notEmpty().withMessage("UserID must not be empty")
        .isAlphanumeric().withMessage("The User ID must be Alphanumeric"),

    body("UserEmail").optional().isEmail().withMessage("Enter a Valid Email"),

    body("Role").optional().isIn(["Customer" , "Admin"]).withMessage("The Role Must be either Customer or Admin"),

    body("Password").optional()
        .notEmpty().withMessage("The Password should not be empty")
        .isAlphanumeric().withMessage("The Password must be Alphanumeric Value"),

    body("Retype_Password").optional().custom((value , {req}) => {
        if(value !== req.body.Password){
            throw new Error("Passwords do not match..")
        }
        return true;
    })
]

module.exports = UserValidationPatchRules;