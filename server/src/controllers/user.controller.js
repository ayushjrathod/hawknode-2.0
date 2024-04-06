import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import User from "../models/user.models.js";
import {uploadFileOnCloud} from "../utils/fileUpload.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


//𝗚𝗲𝗻𝗲𝗿𝗮𝘁𝗶𝗻𝗴 𝗔𝗰𝗰𝗰𝗲𝘀𝘀 𝗮𝗻𝗱 𝗥𝗲𝗳𝗿𝗲𝘀𝗵 𝗧𝗼𝗸𝗲𝗻𝘀 
const generateAccessAndRefreshToken = async (userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;   //storing refresh token on database
        await user.save({validateBeforeSave:false});

        return {accessToken,refreshToken};  

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating access and refresh token");
    }
};

//𝗥𝗲𝗴𝗶𝘀𝘁𝗲𝗿𝗶𝗻𝗴 𝗡𝗲𝘄 𝗨𝘀𝗲𝗿 => Start
const registerUesr = asyncHandler(async(req,res)=>{
    //get uesr details from frontend 
    //validation - not empty
    //check if user already exsists
    //check for images, check for avatar
    //upload images and videso to cloudinary
    //Create user object  - create entry in DB 
    //Remove password and refresh token field from response 
    //Check for user creation
    //Return Response.

    const {fullname,username,email,password} = req.body;

    //𝗖𝗵𝗲𝗰𝗸𝗶𝗻𝗴 𝗶𝗳 𝗮𝗻𝘆 𝗼𝗳 𝘁𝗵𝗲 𝗳𝗶𝗲𝗹𝗱𝘀 𝗮𝗿𝗲 𝗲𝗺𝗽𝘁𝘆
    //some is method called on array goes through all elements are checks if any of them statiefies provided condition
    //? is a opitional chaininh operator used it returns undefined or null instead of error if the thing is empty
    if([fullname,username,email,password].some((field)=>field?.trim() === ""))
        throw new ApiError(400,"All fields are required");

    //𝗖𝗵𝗲𝗰𝗸𝗶𝗻𝗴 𝗶𝗳 𝘂𝘀𝗲𝗿 𝗮𝗹𝗿𝗲𝗮𝗱𝘆 𝗲𝘅𝘀𝗶𝘀𝘁𝘀
    const existingUser = await User.findOne({
        $or : [{username},{email}]   //performs or on the array
    });
    
    if(existingUser)
        throw new ApiError(409,"User with email or username already exsists")

    //𝗔𝘃𝗮𝘁𝗮𝗿 𝗮𝗻𝗱 𝗰𝗼𝘃𝗲𝗿 𝗜𝗺𝗮𝗴𝗲𝘀
    const avatarLocalPath = req.files?.avatar[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length >0)
        coverImageLocalPath = req.files.coverImage[0].path;

    if(!avatarLocalPath)
        throw new ApiError(400,"Avatar file is required");

    const avatar = await uploadFileOnCloud(avatarLocalPath);
    const coverImage = await uploadFileOnCloud(coverImageLocalPath);

    if(!avatar)
        throw new ApiError(400,"failed to upload avatar file");

    //Creating User
    const user = await User.create(
        {
            fullname,         //in es6 or js we can use fullname instead of username:username
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase();
        }
    );

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createdUser)
        throw new ApiError(500,"Something went wrong while registering the user");

    return res.status(201).json(new ApiResponse(200,createdUser,"User Registered Successfully"));    
});
//Registering new User => END

//User Login logic =>Start
const loginUser = asyncHandler(async(req,res)=>{
    const {email,username,password} = req.body;
    
    if(!username && !email)      // (!(username || email)) can be used
        throw new ApiError(400,"username or email is required");

    const user = await User.findOne({
        $or :[{username},{email}]
    });

    if(!user)
        throw new ApiError(404,"User does not exsist");

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid)
        throw new ApiError(401,"Invaid User Creadentails");

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    ) 

});
//Login User Logic =>END

//Logout User =>Start
const logoutUser = asyncHandler(async(userId)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{refreshToken: 1} //this removes the feild from the document
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponse(200,{},"User logged Out"))
});
//LogoutUser =>END


// Start of refreshing access token after expiry
const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomigRrefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomigRrefreshToken)
        throw new ApiError(401,"Unauthorized Access");

        try {
            const decodedToken = jwt.verify(
                incomigRrefreshToken,
                process.env.REFRESH_TOKEN_SECRET
            )
            const user = await User.findById(decodedToken?._id);

            if(!user)
                throw new ApiError(401,"invalid Refresh Token");

        if(incomingRefreshToken !== user?.refreshToken) 
            throw new ApiError(401, "Refresh token is expired or used");
            
        
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id);
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }         

});
// End of refreshing access token after expiry

// Start of changeCurrentPassword
const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})
// End of changeCurrentPassword

// Start of getCurrentUser
const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})
// End of getCurrentUser

// Start of updateAccountDetails
const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullName, email} = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});

// End of updateAccountDetails

// Start of updateUserAvatar
const updateUserAvatar = asyncHandler(async(req, res) => {
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    //TODO: delete old image - assignment

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar")
        
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Avatar image updated successfully")
    )
})
// End of updateUserAvatar

// Start of updateUserCoverImage
const updateUserCoverImage = asyncHandler(async(req, res) => {
    const coverImageLocalPath = req.file?.path

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is missing")
    }

    //TODO: delete old image - assignment


    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImage.url) {
        throw new ApiError(400, "Error while uploading on avatar")
        
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                coverImage: coverImage.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Cover image updated successfully")
    )
})
// End of updateUserCoverImage

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
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    // getUserChannelProfile,
    // getWatchHistory
}