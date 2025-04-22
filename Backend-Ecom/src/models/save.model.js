import mongoose,{Schema} from "mongoose";

const saveSchema = new Schema(
    {
        product:{
            type: Schema.Types.ObjectId,
            ref: "Product"
        },

        user:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
    )

export const Save= mongoose.model("Save",saveSchema)