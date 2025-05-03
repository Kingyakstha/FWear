import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Product } from "../models/product.model.js"
import { User } from "../models/user.model.js"
import mongoose from "mongoose"
import { QnA } from "../models/qna.model.js"

const addQuestion = asyncHandler( async (req, res)=>{
    const {question}= req.body
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

    const qna= await QnA.create({
        question,
        user:user._id,
        product:product._id
    })
    return res
    .status(200)
    .json(
        new ApiResponse(200, qna, "Question has been created")
    )
})

const addAnswer= asyncHandler(async (req,res)=>{
    const {answer}= req.body
    const {questionid}= req.params

    if (!questionid) {
        throw new ApiError(401, "Question ID is required");
    }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(questionid)) {
        throw new ApiError(400, "Invalid question ID");
    }

    const answeredQuestion= await QnA.findByIdAndUpdate(
        questionid,
        {
            $set:{
                answer: answer
            }
        },
        {new:true}
    )

    if (!answeredQuestion){
        throw new ApiError(404, "Question not found !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, answeredQuestion, "Answer has been added")
    )
})

const changeQuestion=asyncHandler(async(req,res)=>{
    const {questionid}=req.params 
    const {question} =req.body

    // console.log("question in body is ",question)

    if (!questionid) {
        throw new ApiError(401, "Question ID is required");
    }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(questionid)) {
        throw new ApiError(400, "Invalid question ID");
    }

    const qna= await QnA.findByIdAndUpdate(
        questionid,
        {
            $set:{
                question:question
            }
        },
        {new:true}
    )

    if(!qna){
        throw new ApiError(400,"Error while updating question ::")

    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,qna,"Successfully edited the question !!!")
    )
})


const removeQuestion= asyncHandler (async(req,res)=>{
    const {questionid}= req.params

    if (!questionid) {
        throw new ApiError(401, "Question ID is required");
    }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(questionid)) {
        throw new ApiError(400, "Invalid question ID");
    }

    const removedQuestion= await QnA.findByIdAndDelete(questionid)
    if(!removedQuestion){
        throw new ApiError(400,"Error occured while removing the question")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Question successfully deleted !!! ")
    )
})

const removeAnswer= asyncHandler( async( req,res)=>{
    const {questionid}= req.params

    if (!questionid) {
        throw new ApiError(401, "Question ID is required");
    }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(questionid)) {
        throw new ApiError(400, "Invalid question ID");
    }

    const removedAnswer= await QnA.findById(questionid)

    removedAnswer.answer= null;
    await removedAnswer.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(
        new ApiResponse(200,removedAnswer,"Answer successfully removed !!! ")
    )

})


//TODO 
//show all the questions and answers based on product
const getQnas =asyncHandler(async (req,res)=>{
    const {productid}=req.params
    if (!productid) {
        throw new ApiError(401, "Product ID is required");
        }

    // Validate the productid as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productid)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const qnas= await QnA.aggregate([
    {
      $match: {
        product: new mongoose.Types.ObjectId(productid)
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
        path: "$user",
      }
    },
    {
      $addFields: {
        name: "$user.fullname",
        avatar:"$user.avatar"
      }
    },
    {
      $project: {
        name:1,
        avatar:1,
        question:1,
        answer:1
      }
      //name, avatar, question,answer,
    }
    ])

    if(!qnas){
        throw new ApiError(400,"Error while querying !!!")
      }

    return res
    .status(200)
    .json(
        new ApiResponse(200, qnas,"Qna successfully fetched !!!")
    )

})

export {addAnswer,addQuestion,changeQuestion,removeQuestion, removeAnswer, getQnas}