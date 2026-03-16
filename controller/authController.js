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
          
          if(error){ return res.status(400).json({ 
            msg: error.details.map((err) => err.message),
          })
        };
        
        const {username,email, password,role} = value;
        
        const existUser = await User.findOne({email});
        if(existUser) return res.status(400).json({msg: "User Already Exist"});

        //hash password
        const hashPassword = await bcrypt.hash(password,10);
      // insert data into DB
        const newUser = await User.create({
          username,
          email,
          password:hashPassword, 
          role
        });

        // response 
        res.status(201).json({msg:"Account Created Successfully"});

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
          if(error){ return response.status(400).json({ 
            msg: error.details.map((err) => err.message),
          })
        };

    // get data from value
    const {email, password} = value;

    //check user found or not
      const user = await User.findOne({email});

      if(!user) return res.status(400).json({
          msg: "Please create account first"
        });

    //compare pasword
        const matchpassword = await bcrypt.compare(password, user.password);
        if(!matchpassword) return res.status(400).json({
          msg: "Invalid password"
        });
        console.log(matchpassword);

    // token 
    const token = jwt.sign({
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SK,
        {
          expiresIn: "1day"
        },
      );

      res.status(200).json({
          msg: "login success",
          token,
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