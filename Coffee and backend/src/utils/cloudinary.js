import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        //upload on cloudinary cloud

        const response = await cloudinary.uploader.upload(localFilePath , {resource_type : "auto"})

        // File has been updated successfully 
        //console.log("file is uploaded on Cloudinary" ,response.url );

        fs.unlinkSync(localFilePath)

        return response ;
    } catch (error) {
        fs.unlink(localFilePath) //  remove the locally saved file from server  as operation got failed
    }
}

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});


const deleteFromCloudinary = async (fileToDelete) => {
    try {
       const response =  await cloudinary.uploader.destroy(fileToDelete , {
         resource_type: "image"
       });
       return response
    } catch (error) {
       return null
    }
   };
   
   const deleteVideoFromCloudinary = async (fileToDelete) => {
     try {
        const response =  await cloudinary.uploader.destroy(fileToDelete , {
          resource_type: "video"
        });
        return response
     } catch (error) {
        return null
     }
    };
   
   export { uploadOnCloudinary, deleteFromCloudinary ,deleteVideoFromCloudinary};

