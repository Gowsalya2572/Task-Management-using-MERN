import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Required"],
        trim:true,
        maxlength:30,
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        trim:true,
        unique:true,
        lowercase:true,
        match:[ /^\S+@\S+\.\S+$/,
        "Please enter a valid email",],
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
        minlength:8,
        validate:{
            validator:function(v){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(v);
            },
            message: "Requires Minimum 8 characters At least 1 uppercase At least 1 lowercaseAt least 1 numberAt least 1 special character"
        }
    },
    role:{
        type:String,
        enum:["user","admin","projectManager"],
        default:"user",
    },
},
    {
        timestamps:true
   }
);

export default mongoose.model('User',userSchema);
