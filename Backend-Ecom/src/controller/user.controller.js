import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens= async (userId)=>{
    try {
        const user= await User.findById(userId)
        const accessToken= user.generateAccessToken()
        const refreshToken= user.generateRefreshToken()

        user.refreshToken=refreshToken
        await user.save({validateBeforeSave : false})

        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser= asyncHandler(async(req,res)=>{
    
        // get users details from frontend
        // validation - check if they are emptyclear
        // check if user already exists - using email and username
        // check for image, check for avatar
        // upload them to cloudinary, avatar
        // create user object - create entry in db
        //remove password and refress token field form response
        // check for user creation
        // return response
    
        //takes the info frm the frontend
        const {fullname, email, password}=req.body
        const username=fullname.toLowerCase();
        console.log("email :",email," user name ",username)
    
        console.log("Body of the request :",req.body)
    
        //check if all the fields are given 
        if (
            [fullname,email,password].some((field)=>field?.trim()==="")
        )
        {
            throw new ApiError(400,"All fields are required")
        }
        
    
        //searches if the user already exists or not
        const existedUser= await User.findOne({
            $or:[{username},{email}]
        })
        
        console.log("Existed user :",existedUser)
        if (existedUser){
            throw new ApiError(409,"User with email or username already exits")
        }
    
        //check for the avatar file
        const avatarLocalPath=req.file?.path;
        console.log(" What is in the file \n", req.file)
        console.log("Avatars local path",avatarLocalPath)
         
        if(!avatarLocalPath){
            throw new ApiError(400,"Avatar file is required")
        }
    
        //upload in cloudinary
        const avatar=await uploadOnCloudinary(avatarLocalPath)
    
        if (!avatar){
            throw new ApiError(400,"Avatar file is required")
        }
    
        //enter the data in database
        const user = await User.create({
            fullname,
            avatar:avatar.url,
            email,
            password,
            username:username?.toLowerCase()
        }) 
    
        console.log("User db :",user)
        //check if the user is present in db or not
        const createdUser =await User.findById(user._id).select(
            "-password -refreshToken"
        )
        if (!createdUser){
            throw new ApiError(500,"Something went wrong while registering the user")
        }
        console.log("After user creation",createdUser)
    
        return res.status(201).json(
            new ApiResponse(200,createdUser,"User registered successfully")
        )
})

const loginUser= asyncHandler ( async (req,res)=>{
    const {email, password}=req.body
    // console.log(`email  ${email} and password  ${password} \n` ,req.body)
    if(!email || !password)
    {
        throw new ApiError(400,"Enter email and password")
    }

    const user=await User.findOne({email})
    if (!user){
        throw new ApiError(404,"User with this email doesn't exist")
    }

    const pass=await user.isPasswordCorrect(password)
    if (!pass)
    {
        throw new ApiError(400,"Password is incorrect");
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser= await User.findById(user._id).select("-password -refreshToken")

    const options={ // cookies modifiable only through server
        httpOnly: true,
        // secure: true    //for production where https is present 
        secure: process.env.NODE_ENV === "production", // Use secure in production only
        sameSite: 'lax' // add this for cross-origin control

    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{user:loggedInUser,accessToken,refreshToken},`User login successfully`)
    )

})

const logoutUser= asyncHandler( async (req, res)=>{
    const user= await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options={ // cookies modifiable only through server
        httpOnly: true,
        // secure: true    //for production where https is present 
        secure: process.env.NODE_ENV === "production" ,// Use secure in production only
        sameSite: 'lax' // add this for cross-origin control

    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,{user},"User logged out successfully")
    )


})

const refreshAccessToken= asyncHandler( async (req,res)=>{
   try {
     const incomingRefreshToken= req.cookies.refreshToken || req.body.refreshToken
 
     if( !incomingRefreshToken)
     {
         throw new ApiError(401,"unauthorised request")
     }
 
     const decodedToken=jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
 
     const user= await User.findById(decodedToken._id)
 
     if (!user){
         throw new ApiError(401,"Invalid refresh token")
     }
 
     if ( incomingRefreshToken !==user?.refreshToken)
     {
         throw new ApiError(401,"refresh token is expired")
     }
 
     const options={ // cookies modifiable only through server
         httpOnly: true,
        // secure: true    //for production where https is present 
        secure: process.env.NODE_ENV === "production", // Use secure in production only
        sameSite: 'lax' // add this for cross-origin control

     }
     const {accessToken,newRefreshToken}=await generateAccessAndRefreshTokens(user._id)
 
     res
     .status(200)
     .cookie("accessToken",accessToken,options)
     .cookie("refreshToken",newRefreshToken,options)
     .json(
         new ApiResponse(
             200,
             {accessToken,newRefreshToken},
             "Access token refreshed"
         )
     )
   } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
   }


})

const changeCurrentPassword= asyncHandler( async (req, res)=>{
    const { oldpassword, newpassword}= req.body

    const user= await User.findById(req.user?._id)

    const isPasscorrect= await user.isPasswordCorrect(oldpassword)

    if( !isPasscorrect){
        throw new ApiError(401,"Incorrect password")
    }

    user.password= newpassword
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password changed successfully"))

})

const getCurrentUser=asyncHandler(async(req,res)=>
    {
        const userInfo=req.user
        return res
        .status(200)
        .json(
            new ApiResponse(200,userInfo,"current user fetched successfully")
        )
            
})

const changeAvatar= asyncHandler( async(req,res) =>{
    const avatarPath= req.file?.path

    if(!avatarPath){
        throw new ApiError(401, "Provide the avatar")
    }

    const avatar= await uploadOnCloudinary(avatarPath)
    if(!avatar.url)
        {
            throw new ApiError(400,"Error while uploading avatar on cloudinary")
        }

    const user= await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                avatar:avatar.url
            }
        },
        {new:true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200,user,"Avatar changed")
    )
})


export {
    registerUser,
    loginUser,
    logoutUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser,
    changeAvatar
}