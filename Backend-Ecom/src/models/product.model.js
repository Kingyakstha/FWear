import mongoose,{Schema} from 'mongoose'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const productSchema = new Schema(
    {
        productname:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },

        price:{
            type: Number,
            required: true,
        },

        gender:{
            type: String,
            required: true,
        },

        category:{ // clothes, show, accesories
            type: String,
            required: true
        },

        // imagencolorfile:{ 
        //     type: Schema.Types.ObjectId,
        //     ref: "Image",
        //     required: true
        // },

        availablesizes:{
            type: [String],
            required: true,
        },

        materials:{
            type: [String],
        },

        care:{
            type: String,
        },

        description:{
            type: String,
            required: true,
        },

    }
    ,{
        timestamps: true
    })


productSchema.plugin(mongooseAggregatePaginate)

export const Product = mongoose.model("Product",productSchema)