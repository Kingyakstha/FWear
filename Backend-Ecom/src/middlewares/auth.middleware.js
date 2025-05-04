import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

export const verifyJWT=asyncHandler(async(req,_,next)=>{
    console.log("=== Auth Middleware Debug ===");
    console.log("Headers:", JSON.stringify(req.headers, null, 2));
    console.log("Cookies:", req.cookies);
    console.log("Raw Cookie String:", req.headers.cookie);
    
    try {
        let token = null;
        
        // Method 1: From parsed cookies
        if (req.cookies?.accessToken) {
            token = req.cookies.accessToken;
            console.log("Token found in parsed cookies");
        }
        
        // Method 2: From raw cookie string
        if (!token && req.headers.cookie) {
            const cookies = req.headers.cookie.split(';');
            console.log("Parsed cookie string:", cookies);
            const accessTokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
            if (accessTokenCookie) {
                token = accessTokenCookie.split('=')[1];
                console.log("Token found in raw cookie string");
            }
        }
        
        // Method 3: From Authorization header
        if (!token && req.header("Authorization")) {
            token = req.header("Authorization").replace("Bearer ", "");
            console.log("Token found in Authorization header");
        }

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        // console.log("decoded token :",decodedToken)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user)
        {
            throw new ApiError(401,"Invalid Access token")
        }
    
        req.user=user;
        console.log("hello")
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid Access token")
    }

})