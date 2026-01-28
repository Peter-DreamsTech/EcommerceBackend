
const IsAdmin = (req,res,next) => {
    try{
        if((req.User.Role)!=="Admin"){
            res.status(402).json({
                Access: "Denied",
                Message: "Unuthorized Access - Only Admin"
            })    
        };
        next();

    }
    catch(err){
        res.status(404).json({
            Message: "Error in IsAdmin",
            Error: err.message
        })
    }
}

module.exports = IsAdmin;