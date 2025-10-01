import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // a bearer token
import mongoose from "mongoose";

//Creating a schema for storing user profile info
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      unique: false,
    },
    refreshToken: {
      type: String,
    },
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

//Encrypting password before saving if the value is modified
userSchema.pre("save", async function (next) {
  // pre is hook which is used when we want to modify some data when data is just to be updated on the database
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//A method to check wether the password provided is correct or not.
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//A method to generate acccess token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      //to send encrypted tokens we use JWT
      _id: this.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
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
