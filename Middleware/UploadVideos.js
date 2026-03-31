const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, "uploads");
    },

    filename: (req,file,cb) =>{
        const uniqueName = Date.now() + "-" + Math.round(Math.random * 10000);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

// file filter 
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["video/mp4", "video/mkv", "video/avi"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only video files are allowed"), false);
    }
};

const uploadVideo = multer({
    storage,
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 } 
});
 module.exports = uploadVideo;