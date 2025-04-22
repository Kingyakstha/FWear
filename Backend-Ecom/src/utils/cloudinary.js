import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if( !localFilePath) return null
        
        //upload to cloudinary
        const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })

        //files successfully uploaded
        console.log("File uploaded successfully in cloudinary\n", response)
        fs.unlinkSync(localFilePath) 
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath) //remove locally saved temporary file 
        console.log('Error occured while uploading \n',error)
    }
}

export {uploadOnCloudinary}