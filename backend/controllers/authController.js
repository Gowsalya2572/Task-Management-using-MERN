import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req,res)=>{
   try {
    const {name,email,password,role} = req.body;

    if( !name || !email || !password){
        return res.status(400).json({
            message: "All fields are Required!!",
        });
    }
    
    const emailRegex =  /^\S+@\S+\.\S+$/;

    if(!emailRegex.test(email)){
        return res.status(400).json({
            message:"Invalid email format",
        });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if(!passwordRegex.test(password)){
        return res.status(400).json({
            message:"Password must contain Minimum 8 characters,At least 1 uppercase,At least 1 lowercase,At least 1 number and At least 1 special character",
        });
    }
    
    const existUser = await User.findOne({email});

    if(existUser){
        return res.status(400).json({
            message: "Email already Exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role,
    });

    res.status(201).json({
        message: "User Registered Successfully",
        user,
    });

   } catch (error) {
       res.status(501).json({
           message: error.message,
       });
   }

}

export const login = async(req,res)=>{
    try {
        const{email,password}=req.body;

        if(!email || !password){
            res.status(400).json({
                message: "All fields are required!!"
            });
        }
        
       const user = await User.findOne({email});

       if(!user){
        res.status(400).json({
            message: "Invalid Credentials"
        });
       }
       
       const isMatch = await bcrypt.compare(password, user.password);

       if(!isMatch){
        res.status(500).json({
            message: "Invalid Credentials",
        });
       }

       const token = jwt.sign({id: user._id ,role:user.role},process.env.JWT_SECRET, {expiresIn:"7d" });

       res.status(200).json({
        token,
        user,
       });


    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}