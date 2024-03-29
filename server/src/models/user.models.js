import mongoose from "mongoose";


//Creating a schema for storing user profile info
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    requried:true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    unique: false,  
  }
},{timestamps: true});   //timestamps is a mongoose feature automatically adds created at and updsated at 

const User = mongoose.model("User", userSchema);

export default User;