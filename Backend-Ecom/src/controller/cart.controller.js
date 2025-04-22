import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import { Product } from "../models/product.model.js"
import { Cart } from "../models/cart.model.js"
import mongoose from "mongoose"

const addToCart= asyncHandler( async (req,res)=>{
    const {productid}= req.params
    const {size,quantity}= req.body

    if (!productid) {
        throw new ApiError(401, "Product ID is required");
    }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productid)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product= await Product.findById(productid)
    if(!product){
        throw new ApiError(400,"Product not found")
    }

    const user= await User.findById(req.user?._id)
    if(!user){
        throw new ApiError(400,"User not found")
    }
    const existedCartItem= await Cart.findOne({
        $and:[{product:productid},{user:user._id},{size:size}]
    })

    console.log("Existed item :",existedCartItem)
    if (existedCartItem){
        // throw new ApiError(409,"User already rated this product")
        existedCartItem.quantity +=quantity;
        await existedCartItem.save({validateBeforeSave:false})

        return res
        .status(200)
        .json(
            new ApiResponse(200, existedCartItem,"Quantity increased in the cart successfully !!!")
        )
    }
    else{
        const cartItem= await Cart.create({
            product: product._id,
            size,
            quantity,
            user:user._id
        })

        return res
        .status(200)
        .json(
            new ApiResponse(200, cartItem,"Product added to cart successfully !!!")
        )
    }
})

const removeFromCart= asyncHandler( async(req,res)=>{
    const {cartid}=req.params
    if (!cartid) {
        throw new ApiError(401, "Cart ID is required");
    }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(cartid)) {
        throw new ApiError(400, "Invalid cart ID");
    }

    const cartItem= await Cart.findByIdAndDelete(cartid)
    return res
    .status(200)
    .json(
        new ApiResponse(200, cartItem,"Successfully deleted")
    )
})

// TODO LIST
// get cartitem based on user
const getCartItems= asyncHandler( async(req,res)=>{

    const userid= req.user?._id
    if (!userid) {
        throw new ApiError(401, "User ID is required");
        }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userid)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const cartItems= await Cart.aggregate(
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
                quantity:1,
                size:1
              }
            }
          ])

    if (!cartItems){
        throw new ApiError(400,"Error when querying !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,cartItems,"Cart items fetched successfully")
    )

        
})

export {
    addToCart,
    removeFromCart,
    getCartItems
}