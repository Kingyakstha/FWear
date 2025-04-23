import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Product} from "../models/product.model.js";
import mongoose from 'mongoose'
// import { uploadOnCloudinary } from "../utils/cloudinary.js"; 

const addProduct= asyncHandler( async (req, res)=>{
    const {productname, description,availablesizes, gender, price, stock, category, materials}= req.body

    console.log("available size",availablesizes)
    if ([productname, gender, category, description].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All fields are required")
    }
    if(!price & !availablesizes){
        throw new ApiError(400,"Add the price")
    }

    const existedproduct= await Product.findOne({productname})
    if(existedproduct){
        throw new ApiError(401,"This product already exists")
    }

    const product = await Product.create(
        {
            productname, 
            description,
            availablesizes,
            gender, 
            price,
            stock,
            category,
            materials: materials, 
            
        }
    ) 

    console.log("Product has been created", product)

    return res
    .status(200)
    .json(
        new ApiResponse(200, product,"Product successfully created")
    )
})

const deleteProduct= asyncHandler( async (req,res)=>{
    const { productid } = req.params;

    if (!productid) {
    throw new ApiError(401, "Product ID is required");
    }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productid)) {
        throw new ApiError(400, "Invalid product ID");
        }

    try {
    // Find and delete the product by ID
    const response = await Product.findByIdAndDelete(productid);

    if (!response) {
        throw new ApiError(404, "Product not found");
    }

    console.log(`Product removed, response is:`, response);
    } catch (error) {
    console.error(error);
    throw new ApiError(500, "An error occurred while deleting the product");
    }


    return res
    .status(200)
    .json(
        new ApiResponse(200,"Successfully product has been deleted")
    )
})

const updateProduct= asyncHandler( async( req,res)=>{
    const {productid}=req.params

    if (!productid) {
        throw new ApiError(401, "Product ID is required");
        }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productid)) {
        throw new ApiError(400, "Invalid product ID");
    }
    
    const {productname, price, gender, category, availablesizes, materials, care, description}= req.body

    if ([productname, gender, category, description].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All fields are required")
    }

    if(!price & !availablesizes){
        throw new ApiError(400,"Add the price")
    }

    const changedProduct= await Product.findByIdAndUpdate(
        productid,
        {
            $set:{
                productname, 
                price, 
                gender, 
                category, 
                availablesizes, 
                materials: materials, 
                care:care,
                description
            }
        },
        {new:true}
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200,changedProduct,"Changes added to the product")
    )
})

//TODO LIST
//get product based on categories, gender and other queries
const getProduct= asyncHandler(async(req,res)=>{
    const {productId}=req.params
    if( !productId){
        throw new ApiError(400,"ID is not provided")
    }

    const product=await Product.findById({_id:productId})
    if( !product){
        throw new ApiError(400,"Product is not available anymore")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,product,"Product retrived successfully !!!")
    )
})
const getProductGender = asyncHandler( async(req,res)=>{
    const { Gender }= req.params// men, women, kids
    const gender= Gender.toLowerCase()

    if ( gender !="men" && gender != "women" & gender !="kids"){
        console.log("Gender",gender)
        throw new ApiError(400,"Gender is not correct, must be men, women or kids !!!")
    }

    const products = await Product.find({gender:gender})

    if (!products){
        throw new ApiError(400,"Error in query !!!")
    }

    return res
    .status (200)
    .json( 
        new ApiResponse(200, products,"Products retrived successfully !!!")
    )
})

const getProductCategory= asyncHandler( async(req,res)=>{
    const { Category }= req.params  // clothes, shoes, bag, accessories
    const category= Category.toLowerCase()

    if ( category !="clothes" && category != "shoes" && category !="bag" && category != "accessories"){
        console.log("Category",category)
        throw new ApiError(400,"Category is not correct, must be clothes, shoes, bag or accessories !!!")
    }

    const products = await Product.find({category:category})

    if (!products){
        throw new ApiError(400,"Error in query !!!")
    }

    return res
    .status (200)
    .json( 
        new ApiResponse(200, products,"Product retrived successfully !!!")
    )
})
export {addProduct,deleteProduct, updateProduct,getProduct, getProductGender,getProductCategory, }