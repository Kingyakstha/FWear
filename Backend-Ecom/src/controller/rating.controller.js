import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Product } from "../models/product.model.js"
import { User } from "../models/user.model.js"
import mongoose from "mongoose"
import { Rating } from "../models/rating.model.js"


const addRating = asyncHandler( async( req,res)=>{
    const {stars}= req.body
    const {productid}= req.params

    if (!productid) {
        throw new ApiError(401, "Product ID is required");
    }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productid)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product= await Product.findById(productid)
    if (!product){
        throw new ApiError(404, "Product not found !!!")
    }
    const user= await User.findById(req.user?._id)

    const existedrating= await Rating.findOne({
        $and:[{product:productid},{user:user._id}]

    })

    console.log("Existed rating :",existedrating)
    if (existedrating){
        throw new ApiError(409,"User already rated this product")
    }

    const rating= await Rating.create({
        stars,
        user:user._id,
        product:product._id
    })


    if(!rating){
        throw new ApiError(500,"Database error")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,rating,"Rating added successfully !!!")
    )
})

const changeRating = asyncHandler( async( req,res)=>{
    const {stars}= req.body
    const {ratingid}= req.params

    if (!ratingid) {
        throw new ApiError(401, "Rating ID is required");
    }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(ratingid)) {
        throw new ApiError(400, "Invalid rating ID");
    }
  
    const rating= await Rating.findByIdAndUpdate(
        ratingid,
        {
            $set:{
                stars:stars
            }
    })

    if(!rating){
        throw new ApiError(500,"Database error, rating not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,rating,"Rating changed successfully !!!")
    )
})

const removeRating = asyncHandler( async( req,res)=>{
    const {ratingid}= req.params

    if (!ratingid) {
        throw new ApiError(401, "Rating ID is required");
    }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(ratingid)) {
        throw new ApiError(400, "Invalid rating ID");
    }
  
    const rating= await Rating.findByIdAndDelete(ratingid)

    if(!rating){
        throw new ApiError(500,"Database error, rating not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,rating,"Rating deleted successfully !!!")
    )
})

//TODO
// show rating based on accumulated rating by users
// it will be done in product controller

export {addRating,changeRating,removeRating}