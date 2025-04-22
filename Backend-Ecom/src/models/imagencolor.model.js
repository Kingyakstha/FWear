import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const imageSchema= new Schema(
    {
        imageurl:{ // from cloudinary
            type: String,
            required: true,
            unique: true
        },

        product:{
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        color:{
            type: String,
            required: true
        }
    }
)

imageSchema.plugin(mongooseAggregatePaginate)

export const Image= mongoose.model("Image",imageSchema)