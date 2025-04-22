import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Product } from "../models/product.model.js"
import { User } from "../models/user.model.js"
import mongoose from "mongoose"
import { Rating } from "../models/rating.model.js"
import { Review } from "../models/review.model.js"


const addReview = asyncHandler( async( req,res)=>{
    const {review}= req.body
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
    const rating= await Rating.findOne({
        $and:[{product:productid},{user:user._id}]

    })
    const existedreview= await Review.findOne(
        {
            $and:[{product:productid},{user:user._id}]
        }
    )

    console.log("Existed review :",existedreview)
    if (existedreview){
        throw new ApiError(409,"User already reviewed this product")
    }

    const reviews= await Review.create({
        rating:rating._id,
        review,
        user:user._id,
        product:product._id
    })


    if(!reviews){
        throw new ApiError(500,"Database error")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,reviews,"Review added successfully !!!")
    )
})

const changeReview = asyncHandler( async( req,res)=>{
    const {review}= req.body
    const {reviewid}= req.params

    if (!reviewid) {
        throw new ApiError(401, "Review ID is required");
    }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(reviewid)) {
        throw new ApiError(400, "Invalid review ID");
    }
  
    const reviews= await Review.findByIdAndUpdate(
        reviewid,
        {
            $set:{
                review: review
            }
    })

    if(!reviews){
        throw new ApiError(500,"Database error, rating not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,reviews,"Review changed successfully !!!")
    )
})

const removeReview = asyncHandler( async( req,res)=>{
    const {reviewid}= req.params

    if (!reviewid) {
        throw new ApiError(401, "Review ID is required");
    }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(reviewid)) {
        throw new ApiError(400, "Invalid review ID");
    }
  
    const reviews= await Review.findByIdAndDelete(reviewid)

    if(!reviews){
        throw new ApiError(500,"Database error, review not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,reviews,"Review deleted successfully !!!")
    )
})

//TODO 
// get reviews based on product
const getReviews =asyncHandler(async (req,res)=>{
    const {productid}=req.params
    if (!productid) {
        throw new ApiError(401, "Product ID is required");
        }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productid)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const reviews= await Review.aggregate([
        {
          $match: {
            product: new mongoose.Types.ObjectId(productid)
          }
        },
        {
          $lookup: {
            from: "ratings",
            localField: "user",
            foreignField: "user",
            as: "star"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $unwind: {
          path: "$star",
            }
        },
        {
          $unwind: {
            path: "$user",
          }
        },
        {
          $addFields: {
            star: "$star.stars",
            avatar: "$user.avatar",
            username: "$user.username"
          }
        },
        {
          $project: {
            review:1,
            star:1,
            username:1,
            avatar:1
          }
        }
      ])

      if(!reviews){
        throw new ApiError(400,"Error while querying !!!")
      }

    return res
    .status(200)
    .json(
        new ApiResponse(200,reviews,"Reviews with rating has been fetched successfully !!!")
    )
})

export {addReview,removeReview,changeReview,getReviews}