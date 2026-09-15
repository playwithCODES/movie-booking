import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (buffer) => {
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "movies",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(buffer);
  });

  return result;
};

const deleteFromCloudinary = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId);

  return result;
};

export default {
  uploadToCloudinary,
  deleteFromCloudinary, 
};