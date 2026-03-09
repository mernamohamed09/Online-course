const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const{registerSchema,loginSchema} = require("./validation/authValidate");



const register = async(req, res) =>{
    try {
        const {error, value} = registerSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

      const {email, password} = value;

      const user = await User.findOne({email});
      if(!user) return res.status(400).json({
        msg: "Please create account first"
      });
      console.log(user);

      //compare pasword
      const matchpassword = await bcrypt.compare(password, user.password);
      if(!matchpassword) return res.status(400).json({
        msg: "Invalid password"
      });
      console.log(matchpassword);
      

      const token = jwt.sign({
        id: user._id,
      },process.env.JWT_SK,
      {
        expiresIn: "1day"
      },
    );
      res.status(200).json({
        msg: "Account created successfully"
      });

    } catch (error) {
       res.status(500).json({
        msg: "Server Erorr"
      });
        
    }
};

// login

const login = async(req, res) =>{
    try {
        const {error, value} = loginSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
    res.status(200).json({
        msg: "login success"
      });

    } catch (error) {
       res.status(500).json({
        msg: "Server Erorr"
      });
    }
};

module.exports = {
    register,
    login
}