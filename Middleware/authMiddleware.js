const jwt = require("jsonwebtoken")

const authmiddleware = async (req,res,next) =>{
    try {
        
        //get token from req.header
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ msg: " token is required"})
        //get token value 

        const token = authHeader.split(" ")[1];
        // token value verify

        const payload = jwt.verify(token, process.env.JWT_SK);
        req.user =payload;

        //next
        next();
    } catch (error) {
      return res.status(401).json({ msg: "token invalid"});
    }
}
module.exports = authmiddleware;