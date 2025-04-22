import mongoose,{Schema} from "mongoose";

const reviewSchema= new Schema(
    {
        rating:{
            type: Schema.Types.ObjectId,
            ref: "Rating"
        },

        review:{
            type: String,
            required: true
        },

        user:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },

        product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },

    }
)


export const Review= mongoose.model("Review",reviewSchema)