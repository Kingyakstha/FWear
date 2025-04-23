import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Product } from "../models/product.model.js"
import { User } from "../models/user.model.js"
import mongoose from "mongoose"
import {Save} from "../models/save.model.js"


const saveProduct = asyncHandler( async( req,res)=>{
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

    const saved= await Save.findOne({
        $and:[{product:productid},{user:user._id}]

    })

    console.log("Already saved :",saved)
    if (saved){
        throw new ApiError(409,"User already saved this product")
    }

    const save= await Save.create({
        user:user._id,
        product:product._id
    })


    if(!save){
        throw new ApiError(500,"Database error")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,save,"Product saved successfully !!!")
    )
})

const unsaveProduct = asyncHandler( async( req,res)=>{
    const {productid}= req.params

    if (!productid) {
        throw new ApiError(401, "Product ID is required");
    }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productid)) {
        throw new ApiError(400, "Invalid product ID");
    }
  
    const user= await User.findById(req.user?._id)
    const unsave= await Save.findOneAndDelete({
      $and:[{product:productid},{user:user._id}]

  })
    // const unsave= await Save.findByIdAndDelete(saveid)

    if(!unsave){
        throw new ApiError(500,"Database error, saved product not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,"Product removed from save successfully !!!")
    )
})

//TODO 
// get saved product based on user
const getSavedProduct= asyncHandler( async(req,res)=>{

    const userid= req.user?._id
    if (!userid) {
        throw new ApiError(401, "User ID is required");
        }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userid)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const saves= await Save.aggregate(
        [
            {
              $match: {
                user: new mongoose.Types.ObjectId(userid)
              }
            },
            {
              $lookup: {
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "product"
              }
            },
              {
              $unwind: {
                path: "$product"
              }
            }
            ,
            {
              $addFields: {
                name: "$product.productname",
                prod_id:"$product._id",
                price:"$product.price"
              }
            },
              {
              $lookup: {
                from: "images",
                localField: "prod_id",
                foreignField: "product",
                as: "images"
              }
            },
        {
          $project: {
            name:1,
            price:1,
            images:1,
            productid: "$prod_id"
          }
        }
    ])

    if (!saves){
        throw new ApiError(400,"NO saves available !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,saves,"Saved products fetched successfully")
    )

        
})

export {saveProduct,unsaveProduct,getSavedProduct}