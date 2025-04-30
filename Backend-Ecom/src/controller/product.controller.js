import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Product} from "../models/product.model.js";
import mongoose from 'mongoose'
// import { uploadOnCloudinary } from "../utils/cloudinary.js"; 

const addProduct= asyncHandler( async (req, res)=>{
    const {productname, description,detail,availablesizes, gender, price, stock, category, materials}= req.body

    console.log("available size",availablesizes)
    if ([productname, gender, category, description,detail].some((field)=>field?.trim()==="")){
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
            detail,
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
const addMultipleProducts = asyncHandler(async (req, res) => {
    const products = req.body.products; // expecting an array of product objects
  
    if (!Array.isArray(products) || products.length === 0) {
      throw new ApiError(400, "No products provided");
    }
  
    const sanitizedProducts = products.map((product, index) => {
      const {
        productname,
        description,
        detail,
        availablesizes,
        gender,
        price,
        stock,
        category,
        materials
      } = product;
  
      if ([productname, gender, category, description,detail].some(field => field?.trim() === "")) {
        throw new ApiError(400, `Missing required fields in product at index ${index}`);
      }
  
      if (price === undefined || availablesizes === undefined) {
        throw new ApiError(400, `Price or available sizes missing in product at index ${index}`);
      }
  
      return {
        productname,
        description,
        detail,
        availablesizes,
        gender,
        price,
        stock,
        category,
        materials
      };
    });
  
    // Optionally filter out duplicates before inserting
    const names = sanitizedProducts.map(p => p.productname);
    const existingProducts = await Product.find({ productname: { $in: names } });
    const existingNames = new Set(existingProducts.map(p => p.productname));
  
    const newProducts = sanitizedProducts.filter(p => !existingNames.has(p.productname));
  
    if (newProducts.length === 0) {
      throw new ApiError(409, "All provided products already exist");
    }
  
    const insertedProducts = await Product.insertMany(newProducts);
  
    return res.status(201).json(
      new ApiResponse(201, insertedProducts, "Products successfully created")
    );
  });
  

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
export {addProduct, addMultipleProducts, deleteProduct, updateProduct, getProduct, getProductGender, getProductCategory}