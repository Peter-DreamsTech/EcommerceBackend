const multer = require("multer");

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null , "Uploads/");
    },
    filename: (req, file, cb)=>{
        cb(null , file.originalname);
    }
});

const FileFilter = (req, file , cb) => {
    if(file.mimetype.startsWith("image/")){
        cb(null , true)
    }
    else{
        cb(new Error("Only Images Allowed.!"))
    }
}

module.exports = multer({
    storage:Storage ,
    fileFilter:FileFilter,
    limits: {
        fileSize: 2*1024*1024
    }
});