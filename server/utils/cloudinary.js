const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})


const uploadToCloudinary = async(file) => {
    try {
      const result = await cloudinary.uploader.upload(file.path, {folder : 'FaceRecognition'});

      fs.unlinkSync(file.path);
      console.log("cloud upload res", result)
      return result.secure_url;
    } catch (error) {
      console.error(`Error uploading ${file.path} : `, error);
      fs.unlinkSync(file.path);
      console.log(`file deleted - ${file.path}`)
    }
  };


const deleteImage = async (Url) => {
    try {
      // Extract the public ID from the URL
      const urlParts = Url.split('/');
      const publicIdWithFormat = urlParts[urlParts.length - 1];
      const publicId = publicIdWithFormat.split('.')[0];
  
      // Delete the image using the public ID
      const result = await cloudinary.uploader.destroy(publicId);
      console.log(result);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };


module.exports = {deleteImage, uploadToCloudinary}