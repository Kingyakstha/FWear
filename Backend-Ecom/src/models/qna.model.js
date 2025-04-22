import mongoose,{Schema} from "mongoose";

const qnaSchema= new Schema(
    {
        question:{
            type: String,
            required: true,
        },

        answer:{
            type: String,
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


export const QnA= mongoose.model("QnA",qnaSchema)