import mongoose from "mongoose";
import jwt from "jsonwebtoken";  // a bearer token
import bcrypt from "bcrypt";

//Creating a schema for storing user profile info
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim:true,
    index:true,
  },
  email: {
    type: String,
    requried:true,
    unique: true,
    lowercase: true,
    trim:true
  },
  fullname:{
    type:String,
    required:true,
    trim:true,
    index:true
  },
  avatar:{
    type:String
  },
  password:{
    type: String,
    required: [true,"password is required"],
    unique: false,  
  }
},{timestamps: true});   //timestamps is a mongoose feature automatically adds created at and updated at 


userSchema.pre("save",async function(next){  // pre is hook which is used when we want to modify some data when data is just to be updated on the database
  if(!this.isModified("password")) return next(); 

  this.password = bcrypt.hash(this.password,10)
  next();
} )

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id:this.id,
    email:this.email,
    username:this.username,
    fullname:this.fullname
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
)
};
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};


const User = mongoose.model("User", userSchema);

export default User;