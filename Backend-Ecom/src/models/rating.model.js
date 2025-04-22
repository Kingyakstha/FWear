import mongoose,{Schema} from "mongoose";

const ratingSchema= new Schema(
    {
        stars:{
            type: Number,
            required: true,
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


export const Rating= mongoose.model("Rating",ratingSchema)