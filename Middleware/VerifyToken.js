const jwt = require("jsonwebtoken");
require("dotenv").config();

const VerifyToken = (req,res,next) => {
    try{
        const AuthHeaders = req.headers.authorization
        const token = AuthHeaders.split(" ")[1];
        const verification = jwt.verify(token , process.env.JWT_SECRETS);
        req.User = verification;
        // console.log( req.User);
        next();
    }
    catch(err){
        res.status(404).json({
            Message: " Error - Invalid or Expired Token",
            error: err.message
        })
    }
}

module.exports = VerifyToken;