import dotenv from "dotenv";
dotenv.config();

const config={
    port:process.env.PORT|| 5000,
    mongodb_url:process.env.MONGODB_URL || "",
    jwtSecret:process.env.JWTSECRET || "",

    cloudinary:{
    cloudName:process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey:process.env.CLOUDINARY_API_KEY || "",
    apiSecret:process.env.CLOUDINARY_API_SECRET || "",

},
khalti:{
    apiUrl:process.env.KHALTI_API_URL || "",
    secret:process.env.KHALTI_SECRET_KEY || "",
}
}



export default config;