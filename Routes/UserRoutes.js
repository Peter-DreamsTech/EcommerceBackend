const express = require("express");
const router = express.Router();

const UserValidationRules = require("../Validators/UserValidator");
const UserValidationPatchRules = require("../Validators/UserValidator");
const Validate = require("../Middleware/Validate");
const {RegUser , LoginUser,  UpdateUser, DeleteUser} = require("../Controller/UserController");
const VerifyToken = require("../Middleware/VerifyToken");

router.post("/RegUser", UserValidationRules, Validate, RegUser);
router.post("/LoginUser" , LoginUser);
router.put("/UpdateUser/:id", UserValidationRules, Validate, VerifyToken , UpdateUser);
router.patch("/UpdateUser/:id", UserValidationPatchRules, Validate, VerifyToken ,UpdateUser);
router.delete("/DeleteUser/:id",VerifyToken,  DeleteUser);

module.exports = router;