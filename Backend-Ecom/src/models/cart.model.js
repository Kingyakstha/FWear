import mongoose,{Schema} from "mongoose";

const cartSchema = new Schema(
    {
        product:{
            type: Schema.Types.ObjectId,
            ref: "Product"
        },

        size:{
            type: String,
            required:true
        },

        quantity:{
            type: Number,
            required: true
        },

        user:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
    )

export const Cart= mongoose.model("Cart",cartSchema)