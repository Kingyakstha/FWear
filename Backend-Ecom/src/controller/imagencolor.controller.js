import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Image } from "../models/imagencolor.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { Product } from "../models/product.model.js";


const addImages= asyncHandler ( async (req,res)=>{
    const {color} = req.body
    const {productid}= req.params

    if (!productid) {
        throw new ApiError(401, "Product ID is required");
        }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productid)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product= await Product.findById(productid)

    if (!color){
        throw new ApiError(400,"Color is not provided")
    }

    const imgPath= req.file?.path

    if (!imgPath){
        throw new ApiError(401,"Image file not available")
    }

    const uploaded= await uploadOnCloudinary(imgPath)
    console.log("Uploaded has ", uploaded)

    const img= await Image.create(
        {
            imageurl: uploaded.url,
            product:product._id,
            color
        }
    )

    return res.status(200).json(
        new ApiResponse(200,img,"Image data created successfully !!!")
    )
})

const removeImage= asyncHandler(async (req,res)=>{
    const {imgid}= req.params

    if (!imgid) {
        throw new ApiError(401, "Image ID is required");
    }
    
    // Convert the productid to ObjectId
    const imgId = new mongoose.Types.ObjectId(imgid);

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(imgId)) {
        throw new ApiError(400, "Invalid image ID");
    }

    const img= await Image.findByIdAndDelete(imgId)

    return res
    .status(200)
    .json(
        new ApiResponse(200, img, "Image successfully deleted !!!")
    )
})

const changeColor= asyncHandler( async(req,res)=>{
    const {newcolor}= req.body;
    const {imgid}= req.params

    if (!imgid) {
        throw new ApiError(401, "Image ID is required");
    }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(imgid)) {
        throw new ApiError(400, "Invalid image ID");
    }

    const img= await Image.findById(imgid)

    if (!newcolor){
        throw new ApiError(400,"Provide the new color")
    }

    if( newcolor== img.color){
        throw new ApiError(400,"Same as previous color")
    }

    img.color=newcolor
    await img.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(
        new ApiResponse(200, img, "color changed successfully")
    )
})

//TODO 
//get images based on product and grouped in terms of color
const getImagenColor= asyncHandler( async(req,res)=>{
    const {productid}=req.params
    if (!productid) {
        throw new ApiError(401, "Product ID is required");
        }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productid)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const imgnColor= await Image.aggregate([
        {
            $match: {
              product:new mongoose.Types.ObjectId(productid)
            }
        },
        {
          $group: {
            _id:{
                colors:"$color",
                product:"$product"  
            },
            imageurls: { $push: "$imageurl" }
          }
        },
        {
          $group: {
            _id: "$_id.product",
            color:{
              $push:{
                color: "$_id.colors",
                image:"$imageurls"
              }
            }
        }
        },
        {
          $project: {
            _id: 0,
            product: "$_id",
            color:1
          }
        }
      ])

    if(!imgnColor){
        throw new ApiError(400,"Error while querying !!!")
    }
    
      return res
      .status(200)
      .json(
        new ApiResponse(200,imgnColor,"Images with color fetched successfully !!!")
      )

})
export {addImages, changeColor, removeImage, getImagenColor}