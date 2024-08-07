import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.models.js";
import { uploadFileOnCloud, deleteFileFromCloud } from "../utils/fileUpload.js";
import jwt from "jsonwebtoken";

//Genrating access and refresh tokens => start
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken; //storing refresh token on database
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};
//Genrating access and refresh tokens => end

//Registering New User => Start
const registerUser = asyncHandler(async (req, res) => {
  //get uesr details from frontend
  //validation - not empty
  //check if user already exsists
  //check for images, check for avatar
  //upload images and videso to cloudinary
  //Create user object  - create entry in DB
  //Remove password and refresh token field from response
  //Check for user creation
  //Return Response.

  const { fullname, username, email, password } = req.body;
  //some is method called on array goes through all elements are checks if any of them statiefies provided condition
  //? is a opitional chaining operator used it returns undefined or null instead of error if the thing is empty
  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  )
    throw new ApiError(400, "All fields are required");

  //𝗖𝗵𝗲𝗰𝗸𝗶𝗻𝗴 𝗶𝗳 𝘂𝘀𝗲𝗿 𝗮𝗹𝗿𝗲𝗮𝗱𝘆 𝗲𝘅𝘀𝗶𝘀𝘁𝘀
  const existingUser = await User.findOne({
    $or: [{ username }, { email }], //performs or on the array
  });

  if (existingUser)
    throw new ApiError(409, "User with email or username already exsists");

  //𝗔𝘃𝗮𝘁𝗮𝗿
  const avatarLocalPath = req.file ? req.file.path : null;

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

  const avatarImage = await uploadFileOnCloud(avatarLocalPath);

  if (!avatarImage) throw new ApiError(400, "failed to upload avatar file");

  //Creating User
  const user = await User.create({
    fullname, //in es6 or js, username == username:username
    avatar: avatarImage?.url,
    email,
    password,
    username: username.toLowerCase(),
    savedPosts: [],
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering the user");

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});
//Registering New User => END

//User Login logic =>Start
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username && !email)
    // (!(username || email)) can be used
    throw new ApiError(400, "username or email is required");

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) throw new ApiError(404, "User does not exsist");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invaid User Creadentails");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { user, accessToken }, "User logged In Successfully")
    );
});
//Login User Logic =>END

//Logout User =>Start
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.body._id,
    {
      $unset: { refreshToken: 1 }, //this removes the feild from the document
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});
//LogoutUser =>END

// Start of refreshing access token after expiry
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomigRefreshToken =
    req.cookies.refreshToken ||
    req.params.refreshToken ||
    req.query.refreshToken ||
    req.body.refreshToken;

  if (!incomigRefreshToken) throw new ApiError(401, "Unauthorized Access");

  try {
    const decodedToken = jwt.verify(
      incomigRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);

    if (!user) throw new ApiError(401, "invalid Refresh Token");

    console.log(`this is the incomign refresh token ${incomigRefreshToken}`);
    console.log(`this is user.refreshToken ${user.refreshToken}`);

    if (incomigRefreshToken !== user?.refreshToken)
      throw new ApiError(401, "Refresh token is expired or used");

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(new ApiResponse(200, { accessToken }, "Access token refreshed"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});
// End of refreshing access token after expiry

// Start of changeCurrentPassword
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});
// End of changeCurrentPassword

// Start of getCurrentUser
//getting user and sending it updatesd user details.
const getUser = asyncHandler(async (req, res) => {
  const user = req.body;
  const currentUser = await User.findById(user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, currentUser, "User fetched successfully"));
});
// End of getCurrentUser

//Get saved posts of a user => Start
const getSavedPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .populate({
        path: "savedPosts",
        populate: { path: "createdBy", model: "User", select: "username" },
        })
    .then((user) => {
      if (!user) throw new ApiError(404, "User not found");

      return res.status(200).json(new ApiResponse(200, user.savedPosts, "Saved Posts"));
    })
    .catch((error) => {
      throw new ApiError(400, "User not found, err : ", error);
    });
});

// Start of updateAccountDetails
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { userId, fullname, email, oldAvatar } = req.body;
  const newAvatarLocalPath = req.file.path;

  if (!fullname || !email || !oldAvatar) {
    throw new ApiError(400, "All fields are required");
  }
  if (!newAvatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  deleteFileFromCloud(oldAvatar);

  const avatar = await uploadFileOnCloud(newAvatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }
  console.log(`gfnefngkengkaejngioawe=>${userId}`);
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        fullname,
        email,
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});
// End of updateAccountDetails

// Start of getUserChannelProfile

// End of getUserChannelProfile

// Start of getWatchHistory

// End of getWatchHistory

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getUser,
  updateAccountDetails,
  getSavedPosts,
};
