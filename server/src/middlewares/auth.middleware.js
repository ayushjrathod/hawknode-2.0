import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import  User  from "../models/user.models.js";

//Verifying Json web tokens attached to incomming requests
//Verifies if the associated user is authencated and if not throws and error
//Basically this is isLOggedIN
export const verifyJWT = asyncHandler(async(req, _, next) => {    // _ is used as a placeholder for unsed parameter
     
    try {
        const token = req.body.accessToken || req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") //token = "Bearer fdgjnmklmagkfdg"
        
         console.log(token);
        if (!token)
            throw new ApiError(401, "Unauthorized request")
        
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user)
             throw new ApiError(401, "Invalid Access Token")
    
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})